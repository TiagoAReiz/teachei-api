package com.teachei.api.adapter.out.persistence.postgres.mapper;

import com.teachei.api.adapter.out.persistence.postgres.entity.UsuarioEntity;
import com.teachei.api.domain.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UsuarioMapper {

    Usuario toDomain(UsuarioEntity entity);

    UsuarioEntity toEntity(Usuario domain);
}



