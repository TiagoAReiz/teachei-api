package com.teachei.api.adapter.out.persistence.postgres.mapper;

import com.teachei.api.adapter.out.persistence.postgres.entity.PerfilEntity;
import com.teachei.api.domain.model.Perfil;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PerfilMapper {

    Perfil toDomain(PerfilEntity entity);

    PerfilEntity toEntity(Perfil domain);
}



