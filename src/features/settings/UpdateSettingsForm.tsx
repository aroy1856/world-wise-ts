import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { settings, isPending } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice,
  } = settings || {};

  function handleUpdateSettings(
    e: React.FocusEvent<HTMLInputElement>,
    field: string
  ) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: +value });
  }

  if (isPending) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking" htmlFor="min-nights">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdateSettings(e, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking" htmlFor="max-nights">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdateSettings(e, "maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking" htmlFor="max-guests">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleUpdateSettings(e, "maxGuestPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price" htmlFor="breakfast-price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSettings(e, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
