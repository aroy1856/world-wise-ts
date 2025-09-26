import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isPending } = useBooking();
  const { isPending: isCheckingIn, checkin } = useCheckin();
  const { isPending: isSettingsLoading, settings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
    setAddBreakfast(booking?.hasBreakfast ?? false);
  }, [booking]);

  if (isPending || isSettingsLoading) return <Spinner />;
  if (!booking) return <Empty resource="Booking" />;

  const { id: bookingId, guests, numGuests, numNights, totalPrice } = booking;

  const optionalBreakfastPrice =
    settings!.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          isPaid: true,
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="breakfast"
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((add) => !add);
            setConfirmPaid(false);
          }}
          disabled={isCheckingIn || confirmPaid || booking?.hasBreakfast}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}.
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          id="confirm-paid"
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid}
        >
          I confirm, that the {guests.fullName} has already paid the amount of{" "}
          {addBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isCheckingIn || !confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
