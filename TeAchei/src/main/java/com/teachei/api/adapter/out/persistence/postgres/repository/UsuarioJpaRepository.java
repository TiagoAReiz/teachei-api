package com.teachei.api.adapter.out.persistence.postgres.repository;

import com.teachei.api.adapter.out.persistence.postgres.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioJpaRepository extends JpaRepository<UsuarioEntity, UUID> {

    Optional<UsuarioEntity> findByEmail(String email);

    boolean existsByEmail(String email);
}



