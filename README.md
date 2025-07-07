# anyshop 쇼핑몰

해당 프로젝트는 기본적인 쇼핑몰 기능에 open ai 챗봇 기능과 결제 모듈 등 기능을 추가한 프로젝트입니다.
<a>https://anyshop-three.vercel.app/<a/>
<br>

## 사용 기술

Next.js, Tailwinds.css, Tanstack-query, react-hook-form, axios, next-ui, zustand, typescript, open ai chat gpt api

# 화면 구성

## 1. 메인 페이지

상단 헤더

배너 이미지 캐러셀

인기 상품 목록

전체 상품 라우팅 버튼

푸터

챗봇 버튼

<img src="https://github.com/user-attachments/assets/223678db-cdeb-4c7f-8de0-9b64ae445a7a">

## 2. 챗봇

open ai의 api에게 쇼핑몰 상품 데이터를 json 파일 형식으로 전달하여 기존 채팅 ai 기능에 추가적으로 쇼핑몰 상품 데이터에 관련한 질문/답변이 가능합니다.

<img src="https://github.com/user-attachments/assets/99218877-7cd3-439f-9ea1-e9ed1e40fb59">

## 3. 로그인

<img src="https://github.com/user-attachments/assets/da0833e1-4ea8-4984-8e46-2c594fa1319e">

## 4. 회원가입

<img src="https://github.com/user-attachments/assets/a84e8838-0412-4c34-bda8-6de2fe4a4a77">

## 5. 제품 목록

관리자가 생성한 상품들을 무한스크롤 기능으로 조회할 수 있습니다.
상단엔 제품 카테고리들이 있습니다.

각 제품카드에는 제품이름, 제품가격, 좋아요/상품평 갯수 및 좋아요 여부등을 조회할 수 있습니다.

<img src="https://github.com/user-attachments/assets/84276779-79c1-428c-b507-78177d1cca59">

## 6. 제품 상세

상단엔 제품 썸네일 여러 장과 제품 풀네임, 가격, 수량버튼, 구매버튼, 장바구니 추가 버튼, 좋아요 버튼이 있습니다.

기본적으로 상세 정보 탭이 노출되며, 리뷰탭으로 이동할 수 있는 UI가 있습니다.

<img src="https://github.com/user-attachments/assets/99dcab91-3851-4795-99e7-49a5a64a634d">

## 7. 제품 상세 정보

제품 상세 정보 탭에서는 상세 이미지를 접었다 펼칠 수 있는 버튼과 제품 등록일, 상세 이미지가 존재합니다.

<img src="https://github.com/user-attachments/assets/b1990077-1d29-4b23-899d-a55f278249e4">

## 8. 제품 상세 리뷰 목록

상품에 대한 리뷰 갯수, 정렬 select UI, 개별 리뷰가 있습니다.

개별 리뷰 카드에는 닉네임, 작성일, 별점, 제목, 이미지, 내용, 추천등이 있습니다.

<img src="https://github.com/user-attachments/assets/80076983-7583-421c-9417-5d714b586f90">

## 9. 제품 리뷰 작성

제품 썸네일, 이름

상품평 제목

상품평 본문

상품평 이미지 추가 버튼

상품평 별점

등록버튼

<img src="https://github.com/user-attachments/assets/f66d792e-2969-41dd-a80f-a914b2e874ea">

## 10. 제품 리뷰 수정

<img src="https://github.com/user-attachments/assets/12d7ed42-e58f-4f42-a271-3c855f422116">

## 11. 장바구니

먼저 장바구니에 상품이 없을 때 화면입니다.

좋아요한 상품 보기 버튼

추천 상품

전체 상품 이동 버튼이 있습니다.

<img src="https://github.com/user-attachments/assets/07bfc66e-8a57-4917-9c6a-04c8370e69dd">

장바구니에 상품이 있다면 총 장바구니 상품 갯수

전체 선택 및 개별 선택 option버튼

선택 삭제 버튼

장바구니 개별 상품 카드

개별 카드에는 상품명, 상품 가격, 갯수, 상품 총 가격, 장바구니 삭제 버튼이 있습니다.

<img src="https://github.com/user-attachments/assets/29eaa8ec-6cad-4793-8c05-1b39d3f1620e">

## 12. 좋아요한 제품

<img src="https://github.com/user-attachments/assets/95ddc371-9ad5-460d-a271-8b6392e8e1d0">

<img src="https://github.com/user-attachments/assets/d0bf6196-c7a2-4586-95f8-6da4869f25b0">

## 13. 주문서

장바구니 페이지에서 제품 선택을 한 후 구매하기 버튼을 누르면 주문서 페이지로 이동됩니다.

배송지 선택 버튼

선택된 상품 카드

결제 금액

<img src="https://github.com/user-attachments/assets/f737cde2-6b52-4a3c-84ed-70ebe4504cf6">

## 14. 주소 작성/수정 관리 화면

<img src="https://github.com/user-attachments/assets/aa5d9d61-ab53-4720-bc70-92063feba39a" alt="주소 조회">

<img src="https://github.com/user-attachments/assets/a9663b46-19df-4f40-a6b2-1f368efc45ae" alt="신규 주소 추가">

<img src="https://github.com/user-attachments/assets/b2f9c877-b70f-43d8-a244-118878ad7a19" alt="daum 주소 추가">

<img src="https://github.com/user-attachments/assets/1f7d1e9d-eace-4c5a-a31b-0ed418449e4b" alt="주소 수정">

## 15. 결제 화면

<img src="https://github.com/user-attachments/assets/d9ad04ac-49d8-4e9e-8a3b-9846c96154fc" alt="결제">

## 16. 결제 완료

<img src="https://github.com/user-attachments/assets/e407ff72-3ca1-4301-bc6c-cbed1793db3d">

## 17. 마이페이지

마이페이지에는 본인 프로필 정보

프로필 이미지 변경

닉네임 변경

주문내역 조회

비밀번호 변경

배송지 관리

리뷰 관리

회원탈퇴가 있습니다.

<img src="https://github.com/user-attachments/assets/39deb956-bd08-4da7-946f-57b488e7c3e3">

## 18. 프로필 이미지 변경

<img src="https://github.com/user-attachments/assets/919e2f42-f1ad-46da-95ec-c1bcfe3f32bf">

## 19. 닉네임 변경

<img src="https://github.com/user-attachments/assets/1b96189b-42f7-4cb6-93e3-11cb82ad0847">

## 20. 주문내역 조회

일을 기준으로 주문 내역이 나누어져 조회됩니다.

주문 시간, 주문 제품, 각 제품 가격, 총 가격이 표시됩니다.

<img src="https://github.com/user-attachments/assets/8ab050a9-6d6d-4142-bb65-b39958b1349b">

## 21. 비밀번호 변경

<img src="https://github.com/user-attachments/assets/5579402b-5811-498b-a169-c5ac4094416f">

## 22. 배송지 관리

<img src="https://github.com/user-attachments/assets/a5c5fb18-4ea0-484f-af77-274265359d8d">

## 23. 리뷰 관리

내가 쓴 리뷰들이 제품을 기준으로 조회되고, 수정 삭제를 할 수 있습니다.

<img src="https://github.com/user-attachments/assets/a00488f8-6759-4033-8adf-f84bf80d46de">

## 24. 회원 탈퇴

사용자의 이메일과 비밀번호를 입력하고 탈퇴버튼을 눌러 계정 탈퇴를 진행합니다.

<img src="https://github.com/user-attachments/assets/aae553a6-a25e-42f4-b426-13dcb60ce653">

## 25. 관리자

관리자 페이지는 관리자 계정만으로만 접속할 수 있습니다.

게시글 등록: 실제 상품 등록할 수 있습니다.

상품 목록: 게시글에 등록되기전 준비되어 있는 상품들의 목록입니다.

상품 등록: 게시글에 등록되기 전 상품을 등록합니다.

카테고리 관리: 상품의 카테고리를 미리 생성할 수 있습니다.

<img src="https://github.com/user-attachments/assets/9864c0e1-ffaa-42f1-a4d6-70b69ab497f7">

## 26. 게시글 등록

게시글 제목

상품 선택

카테고리 선택

상세 이미지 추가

등록

<img src="https://github.com/user-attachments/assets/cb70e734-b8a3-4a37-9c50-1241fe37b428">

## 27. 상품 목록

게시글에 등록되기 전 상품들의 목록입니다.

무한스크롤로 조회합니다.

<img src="https://github.com/user-attachments/assets/a0a78228-3d5d-4d7f-9574-f07ba89542b1">

## 28. 상품 등록

상품명

가격

수량

헤더 이미지 추가

상품 등록

<img src="https://github.com/user-attachments/assets/7eb6dbb5-f84b-4ddb-b9d6-7e36c58bd2d9">

## 29. 카테고리 관리

현재 등록되어 있는 카테고리가 조회되며, 추가/삭제를 할 수 있습니다.

<img src="https://github.com/user-attachments/assets/f2f00af6-29e4-4c24-b9a1-29e392d972dc">
