package com.ziglog.ziglog.global.auth.repository;

import com.ziglog.ziglog.global.auth.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}