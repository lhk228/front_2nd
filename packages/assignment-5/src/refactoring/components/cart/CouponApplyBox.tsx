import { Coupon } from '../../../types.ts';
import { ChangeEvent } from 'react';
import { useCart } from '../../hooks/index.ts';

interface Props {
  coupons: Coupon[];
}

export const CouponApplyBox = ({ coupons }: Props) => {
  //*Hooks
  const { applyCoupon, selectedCoupon } = useCart();

  //*Event Handler
  const handleChangeCoupon = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    applyCoupon(coupons[parseInt(target.value)]);
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <select onChange={handleChangeCoupon} className="w-full p-2 border rounded mb-2">
        <option value="">쿠폰 선택</option>
        {coupons.map(
          (coupon: { name: string; code: string; discountType: string; discountValue: number }, index: number) => (
            <option key={coupon.code} value={index}>
              {coupon.name} -{' '}
              {coupon.discountType === 'amount' ? `${coupon.discountValue}원` : `${coupon.discountValue}%`}
            </option>
          )
        )}
      </select>
      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}(
          {selectedCoupon.discountType === 'amount'
            ? `${selectedCoupon.discountValue}원`
            : `${selectedCoupon.discountValue}%`}{' '}
          할인)
        </p>
      )}
    </div>
  );
};
