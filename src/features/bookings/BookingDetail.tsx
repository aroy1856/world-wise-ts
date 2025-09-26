import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { booking, isPending } = useBooking();
  const { checkout, isPending: isCheckingout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isPending || !booking) return <Spinner />;

  if (!booking) return <Empty resource={`Booking`} />;

  const status = booking.status;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {booking.id}</Heading>
          <Tag
            type={
              statusToTagName[status as keyof typeof statusToTagName] ?? "blue"
            }
          >
            {status?.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check In
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkout(booking.id);
            }}
            disabled={isCheckingout}
          >
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Open name="booking-delete">
            <Button variation="danger" disabled={isDeleting}>
              Delete booking
            </Button>
          </Modal.Open>

          <Modal.Window name="booking-delete">
            <ConfirmDelete
              resourceName="Booking"
              onConfirm={() => {
                deleteBooking(booking.id, { onSuccess: () => navigate("/") });
              }}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
