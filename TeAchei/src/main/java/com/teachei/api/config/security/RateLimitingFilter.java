package com.teachei.api.config.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Rate limiting filter for authentication endpoints.
 * Prevents brute force attacks on login and registration.
 */
@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RateLimitingFilter.class);

    // Buckets per IP address
    private final Map<String, Bucket> loginBuckets = new ConcurrentHashMap<>();
    private final Map<String, Bucket> registerBuckets = new ConcurrentHashMap<>();

    // Rate limits
    private static final int LOGIN_REQUESTS_PER_MINUTE = 5;
    private static final int REGISTER_REQUESTS_PER_HOUR = 3;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        // Only apply rate limiting to POST requests on auth endpoints
        if ("POST".equalsIgnoreCase(method)) {
            String clientIp = getClientIP(request);

            if (path.endsWith("/v1/auth/login")) {
                if (!tryConsume(loginBuckets, clientIp, createLoginBucket())) {
                    log.warn("Rate limit exceeded for login from IP: {}", clientIp);
                    sendRateLimitResponse(response, 60);
                    return;
                }
            } else if (path.endsWith("/v1/auth/registrar")) {
                if (!tryConsume(registerBuckets, clientIp, createRegisterBucket())) {
                    log.warn("Rate limit exceeded for registration from IP: {}", clientIp);
                    sendRateLimitResponse(response, 3600);
                    return;
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean tryConsume(Map<String, Bucket> buckets, String key, Bucket defaultBucket) {
        Bucket bucket = buckets.computeIfAbsent(key, k -> defaultBucket);
        return bucket.tryConsume(1);
    }

    private Bucket createLoginBucket() {
        Bandwidth limit = Bandwidth.classic(LOGIN_REQUESTS_PER_MINUTE,
                Refill.intervally(LOGIN_REQUESTS_PER_MINUTE, Duration.ofMinutes(1)));
        return Bucket.builder().addLimit(limit).build();
    }

    private Bucket createRegisterBucket() {
        Bandwidth limit = Bandwidth.classic(REGISTER_REQUESTS_PER_HOUR,
                Refill.intervally(REGISTER_REQUESTS_PER_HOUR, Duration.ofHours(1)));
        return Bucket.builder().addLimit(limit).build();
    }

    private void sendRateLimitResponse(HttpServletResponse response, int retryAfterSeconds) throws IOException {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setHeader("Retry-After", String.valueOf(retryAfterSeconds));
        response.setContentType("application/json");
        response.getWriter().write("""
            {"status":429,"error":"Too Many Requests","message":"Muitas tentativas. Tente novamente mais tarde.","code":"RATE_LIMIT_EXCEEDED"}
            """);
    }

    private String getClientIP(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return request.getRemoteAddr();
    }

    /**
     * Reset buckets for a successful login (optional - can be called from AuthController)
     */
    public void resetLoginBucket(String clientIp) {
        loginBuckets.remove(clientIp);
    }
}
