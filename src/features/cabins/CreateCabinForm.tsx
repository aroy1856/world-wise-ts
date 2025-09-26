import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

import type { Cabin } from "../../services/types";

interface CabinFormData {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

interface CreateCabinFormProps {
  cabinToEdit?: Cabin;
  onCloseModal?: () => void;
}

function CreateCabinForm({
  cabinToEdit = {} as Cabin,
  onCloseModal,
}: CreateCabinFormProps) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useUpdateCabin();

  const { id: editId, ...cabinData } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinFormData>({
      defaultValues: isEditSession
        ? {
            name: cabinData.name,
            maxCapacity: cabinData.maxCapacity,
            regularPrice: cabinData.regularPrice,
            discount: cabinData.discount || 0,
            description: cabinData.description || "",
          }
        : {},
    });
  const { errors } = formState;

  function onSubmit(data: CabinFormData) {
    if (!isEditSession) {
      createCabin(
        {
          ...data,
          image: data.image[0],
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      editCabin(
        {
          cabin: {
            ...data,
            image: data.image?.[0] || cabinData.image || "",
          },
          editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError() {
    toast.error("Please fix the errors in the form to add a cabin");
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : ""}
    >
      <FormRow label="Cabin name" htmlFor="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating || isEditing}
          {...register("name", {
            required: "Name is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        htmlFor="maxCapacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          disabled={isCreating || isEditing}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Max capacity is required",
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        htmlFor="regularPrice"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          disabled={isCreating || isEditing}
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: { value: 0, message: "Price must be at least 0" },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        htmlFor="discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating || isEditing}
          {...register("discount", {
            required: "Discount is required",
            validate: (val) =>
              +val < +getValues().regularPrice ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        htmlFor="description"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isCreating || isEditing}
          {...register("description", { required: "Description is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" htmlFor="image">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating || isEditing}
          {...register("image", {
            required: isEditSession ? false : "Image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          disabled={isCreating || isEditing}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button
          variation="primary"
          size="medium"
          disabled={isCreating || isEditing}
          type="submit"
        >
          {isEditSession ? "Edit Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
