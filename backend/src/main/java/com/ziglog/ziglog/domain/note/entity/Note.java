package com.ziglog.ziglog.domain.note.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.notification.entity.Notification;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Note {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "preview", columnDefinition = "varchar(512)")
    private String preview;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Member author;

    @Column(name = "is_public")
    private boolean isPublic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    //공개하면 저장이 게시가 되고, 비공개 선택하면 그냥 저장. 따로 수정 게시 여부나 수정 게시 시간을 표시하지는 않음.
    @Column(name = "post_datetime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime postDatetime;

    @Column(name = "edit_datetime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime editDatetime;

    @Builder.Default
    @OneToMany(mappedBy = "note", cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "startNote", cascade = CascadeType.REMOVE)
    private List<Quotation> quoted = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "endNote", cascade = CascadeType.REMOVE)
    private List<Quotation> quoting = new ArrayList<>();

    public Note(Long id){
        this.id = id;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public void setContent(String content){
        this.content = content;
    }
    public void setPublic(Boolean isPublic){
        this.isPublic = isPublic;
    }

    public void setPreview(String brief){
        this.preview = brief;
    }

    public void setPostDatetime(LocalDateTime datetime){
        this.postDatetime = datetime;
    }

    public void setEditDatetime(LocalDateTime datetime){
        this.editDatetime= datetime;
    }

    public void changeParentFolder(Folder folder) {
        this.folder = folder;
    }
}
