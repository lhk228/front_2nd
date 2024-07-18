import { Product } from '../../../types.ts';
import { useState} from "react";
import { useEditProduct } from '../../hooks/useEditProduct.ts';
import { EditProductForm } from "./"
interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;

}
export const  ManagementProductList = ({products, onProductUpdate}:Props) => {

	const {
    edit,
    editingProduct,
    editProperty,
    submit: editSubmit,
  } = useEditProduct(products, onProductUpdate);

	//*State
  const [openProductIds, setOpenProductIds] = useState(new Set());

	//*Function
  const toggleProductEditForm = (productId: string) => {
		setOpenProductIds((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(productId)) {
				newSet.delete(productId);
			} else {
				newSet.add(productId);
			}
			return newSet;
		});
  }
	
	//*Event Handler
	const handleEditProduct = (product: Product) => {
    edit({ ...product });
  };

	return (
		<div className="space-y-2">
		{products.map((product, index) => (
			<div key={product.id} data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
				<button
					data-testid="toggle-button"
					onClick={() => {toggleProductEditForm(product.id)}}
					className="w-full text-left font-semibold"
				>
					{product.name} - {product.price}원 (재고: {product.stock})
				</button>
				{openProductIds.has(product.id) && (
					<div className="mt-2">
 						{editingProduct && editingProduct.id === product.id ? (
							<EditProductForm
								products={products}
								editingProduct={editingProduct}
								editProperty={editProperty}
								submit={editSubmit}
								onProductUpdate={onProductUpdate}
							>
								{/* <DiscountForm
									products={products}
									productId={product.id}
									onProductUpdate={onProductUpdate}
								/> */}
							</EditProductForm>
						) : (
							<div>
								{product.discounts.map((discount, index) => (
									<div key={index} className="mb-2">
										<span>
										{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인

										</span>
									</div>
								))}
								<button
									data-testid="modify-button"
									onClick={() => handleEditProduct(product)}
									className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
								>
									수정
								</button>
							</div>
						)}
					</div>
				)}
				
			</div>
		))}
		</div>

  );
}
