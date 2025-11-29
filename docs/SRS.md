# LITMERS VCC 2025 – AI Issue Tracker SRS

AI 기능이 포함된 이슈 트래킹 & 칸반 보드를 구현한다.  
이 문서는 기능 요구사항을 Functional Requirement (FR-XXX) 형태로 정리한 SRS이다.

---

## 1. 시스템 개요

- 팀 기반 프로젝트/이슈 관리 툴
- 칸반 보드, 프로젝트/이슈/댓글 관리
- AI 기능 (요약, 해결 전략 제안, 자동 라벨링, 중복 이슈 탐지, 댓글 요약)
- 이메일/비밀번호 + Google OAuth 로그인
- 웹으로 배포되고 GitHub에 소스 코드가 업로드되어야 함

---

## 2. 도메인 개요

주요 엔티티:

- User: 인증, 프로필, 계정 삭제(Soft Delete)
- Team, TeamMember (OWNER/ADMIN/MEMBER), TeamInvitation, TeamActivityLog
- Project (즐겨찾기, 아카이브), ProjectLabel, ProjectStatus(커스텀 컬럼)
- Issue (상태, 우선순위, 담당자, 라벨, 서브태스크, 히스토리)
- Comment
- Notification
- AI 캐시(요약, 제안, 댓글 요약)

Soft Delete 대상: User, Team, Project, Issue, Comment (`deletedAt` 필드)

---

## 3. 기능 요구사항 (Functional Requirements)

### 3.1 인증 (Authentication)

**FR-001: 회원가입 (Sign Up)**  
- 이메일/비밀번호/이름으로 가입
- 입력:
  - `email`: 유니크, 이메일 형식, 최대 255자
  - `password`: 6~100자
  - `name`: 1~50자
- 처리:
  - 이메일 중복 체크
  - User 생성
  - 생성 후 자동 로그인 또는 로그인 화면 이동 (자유)
- 예외:
  - 중복 이메일, 형식 오류 시 에러 표시

**FR-002: 로그인/로그아웃**  
- 이메일/비밀번호로 로그인
- 처리:
  - 이메일로 사용자 조회
  - 비밀번호 검증
  - 성공 시 세션/토큰 발급 (만료 24시간)
  - 인증 필요한 페이지 접근 가능
- 예외:
  - 불일치 시 "이메일 또는 비밀번호가 올바르지 않습니다"

**FR-003: 비밀번호 찾기/재설정**  
- 이메일 기반 비밀번호 재설정
- 처리:
  - 이메일 입력
  - 재설정 링크/토큰 발급 (만료 1시간)
  - 실제 이메일 발송 필수
  - 새 비밀번호로 변경

**FR-004: Google OAuth 로그인**  
- Google 계정을 사용한 SNS 로그인
- 처리:
  - Google OAuth 플로우 구현
  - 신규 사용자는 자동 회원가입
  - 기존 사용자는 로그인
- 주의:
  - 이메일/비밀번호 로그인과 별개
  - 동일 이메일 계정 병합은 고려하지 않음

**FR-005: 프로필 관리**  
- 프로필 조회/수정
- 수정 가능:
  - `name` (1~50자)
  - `profileImage` (이미지 URL 또는 파일 업로드)
- 처리:
  - URL 입력 또는 파일 업로드 중 택1
  - 변경 즉시 반영

**FR-006: 비밀번호 변경**  
- 로그인 사용자만
- 입력:
  - `currentPassword`
  - `newPassword` (6~100자)
  - `confirmPassword` (new와 일치)
- 처리:
  - 현재 비밀번호 검증
  - 새 비밀번호
