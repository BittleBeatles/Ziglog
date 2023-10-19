package com.ziglog.ziglog.member.entity;

import jakarta.persistence.*;

@Entity
public class Member {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String nickname;

    @Column
    private String email;

    @Column
    private String password;

    @Column (columnDefinition = "varchar(32) default 'GUEST'")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column
    private String profileUrl;

}
