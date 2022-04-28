## Fixes

### Xem git diff để biết rõ phần nào thay đổi

- Thêm mới thư mục 'http' và config cho axios:

```
Thư mục /src/http chứa các modules, trong đó có các request sẽ dùng trong các thẻ view. Gom các request vào cùng một thư mục và có phân loại theo chủ đề để dễ dàng quản lý, tìm kiếm & sửa lỗi.
```

- Thêm mới file .env. [Đọc thêm về .env](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa)

```
Trong /src/http/config.js, set 'baseUrl: import.meta.env.VITE_API_URL' tức là sử dụng serve ở địa chỉ import.meta.env.VITE_API_URL. Thay đổi giá trị này trong file .env
```
