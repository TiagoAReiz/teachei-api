import api from "./api";
import { API_ENDPOINTS } from "@/constants/config";
import { PagamentoResponse } from "@/types";
import * as WebBrowser from "expo-web-browser";

export const paymentsService = {
  /**
   * Create a payment preference for an intention
   * Returns Mercado Pago init_point URL
   */
  async createPreference(anuncioId: string): Promise<PagamentoResponse> {
    const response = await api.post<PagamentoResponse>(
      API_ENDPOINTS.PAYMENT_PREFERENCE(anuncioId)
    );
    return response.data;
  },

  /**
   * Open payment URL in browser (Mercado Pago checkout)
   * Uses sandbox URL in development, production URL in prod
   */
  async openPaymentCheckout(
    paymentResponse: PagamentoResponse,
    useSandbox = __DEV__
  ): Promise<WebBrowser.WebBrowserResult> {
    const url = useSandbox
      ? paymentResponse.sandboxInitPoint || paymentResponse.initPoint
      : paymentResponse.initPoint;

    return WebBrowser.openBrowserAsync(url, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
    });
  },

  /**
   * Convenience method to create preference and open checkout
   */
  async payForIntention(
    anuncioId: string,
    useSandbox = __DEV__
  ): Promise<WebBrowser.WebBrowserResult> {
    const preference = await this.createPreference(anuncioId);
    return this.openPaymentCheckout(preference, useSandbox);
  },
};
