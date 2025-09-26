import Button from "../../ui/Button";

interface CheckoutButtonProps {
  bookingId: string;
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  console.log(bookingId);
  return (
    <Button variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
