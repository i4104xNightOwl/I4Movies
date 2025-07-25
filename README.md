# 🎮 I4Movies

**I4Movies** là một dự án mô phỏng hệ thống xem phim trực tuyến, áp dụng kiến trúc micro-frontend với Angular, backend Express (TypeScript), xác thực người dùng qua SSO (ASP.NET), và phân quyền bằng OPA (Open Policy Agent). Dự án tuân theo mô hình MVC và Service Layer, được kiểm thử hành vi (BDD) bằng Jest.

---

## 🚀 Công nghệ sử dụng

### Frontend

* **NX Monorepo + Angular**: Quản lý nhiều ứng dụng/giao diện trong một workspace duy nhất, hỗ trợ tái sử dụng mã nguồn.
* **Micro-Frontend**: Giao diện được tách thành nhiều app Angular độc lập (host + remote).
* **Module nạp động**: Tối ưu tốc độ tải trang bằng cách nạp module khi cần.

### Backend

* **Express + TypeScript**: API RESTful tuân theo mô hình MVC kết hợp Service Layer.
* **Jest (BDD Testing)**: Kiểm thử logic theo hành vi người dùng.

### Xác thực & Phân quyền

* **SSO (Single Sign-On)**: ASP.NET Core xác thực 1 lần cho nhiều hệ thống con.
* **OPA (Open Policy Agent)**: Quản lý quyền truy cập linh hoạt, theo chính sách.

### Mobile (Sắp ra mắt)

* **Kotlin (Android)**: App xem phim trên thiết bị di động.

### DevOps

* **Docker Compose**: Triển khai toàn bộ hệ thống bằng container.
* **Shell Script**: Tự động hóa bước sinh key, thiết lập môi trường.

---

## 📁 Cấu trúc thư mục

```bash
I4Movies/
├── .vscode/               # Cài đặt cho VSCode
├── apps/
│   ├── mobile/            # App Android (chưa hoàn thiện)
│   └── web/
│       └── interfaces/    # Interface dùng chung của BE và FE
│       └── packages/
│           ├── backend/   # API Express + TypeScript
│           └── frontend/   # Frontend Angular
├── opa/                   # Quy tắc OPA
├── sso/                   # Dịch vụ SSO (ASP.NET)
├── storage/               # Lưu file/media
├── docker-compose.yaml    # Triển khai Docker
├── I4Movies.sln           # Solution ASP.NET
├── keygen.sh              # Script tạo key JWT
└── README.md              # Tài liệu dự án
```

---

## 🧪 Cài đặt & Chạy

### 1. Clone dự án & khởi tạo Docker

```bash
git clone https://github.com/i4104xNightOwl/I4Movies.git
cd I4Movies

# Tạo Key cho phần JWT
./keygen.sh

# Build server
docker-compose up --build
```

### 2. Chạy backend

```bash
cd ./apps/web/packages/backend
yarn install
yarn dev
```

### 3. Chạy frontend

**Yêu cầu mở 2 terminal cho 2 giao diện**

```bash
cd ./apps/web/packages/frontend
yarn install
```

```bash
# Giao diện phim (movies)
nx serve movies --port=4200
```

```bash
# Giao diện admin
nx serve admin --port=4201
```

> ⚠️ Yêu cầu cài đặt: Docker, Node.js, .NET SDK, Angular CLI, NX CLI

---

## 🔧 Kiểm thử Backend

```bash
cd ./apps/web/packages/backend
yarn test
```

---

## 💌 Góp ý & Liên hệ

Dự án mang tính học tập. Rất hoan nghên bạn đóng góp hoặc thảo luận.

---

## 📄 Giấy phép

Dự án chỉ dùng cho học tập. Không được sử dụng vào mục đích thương mại.
