import Link from "next/link";

const Admin = () => {
  return (
    <div className="flex flex-col items-center gap-3 text-lg p-3 text-gray-900">
      <Link 
        className="hover:font-semibold"
        href='/admin/post-register'
      >
        게시글 등록
      </Link>
      <Link
        className="hover:font-semibold"
        href='/admin/item-list'
      >
        상품 목록
      </Link>
      <Link 
        className="hover:font-semibold"
        href='/admin/new-item'
      >
        상품 등록
      </Link>
      <Link 
        className="hover:font-semibold"
        href='/admin/item-order'
      >
        주문하기
      </Link>
    </div>
  );
};

export default Admin;