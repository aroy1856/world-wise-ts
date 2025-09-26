import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import type { Cabin } from "../../services/types";
import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowProps {
  cabin: Cabin;
}

export default function CabinRow({ cabin }: CabinRowProps) {
  const { createCabin, isCreating } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity: maxCapacity,
      regularPrice: regularPrice,
      discount: discount || 0,
      description: description || "",
      image: image || "",
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image || undefined} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice || 0)}</Price>
        <Discount>{discount ? formatCurrency(discount) : "—"}</Discount>

        <div>
          <Modal>
            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={cabinId} />

                <Menus.List id={cabinId}>
                  <Menus.Button
                    icon={<HiSquare2Stack />}
                    onClick={handleDuplicate}
                    isDisabled={isCreating}
                  >
                    Duplicate
                  </Menus.Button>

                  <Modal.Open name="edit-form">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open name="delete-confirmation">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </Menus.Menu>

              <Modal.Window name="edit-form">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete-confirmation">
                <ConfirmDelete
                  resourceName="Cabin"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(cabinId)}
                />
              </Modal.Window>
            </Menus>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
