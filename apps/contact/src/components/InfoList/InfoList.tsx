import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ButtonDanger, ButtonSuccess } from "../commons/Buttons";
import EditIcon from "../../assets/edit.svg";
import TrashIcon from "../../assets/trash.svg";
import { CardList, CardItem } from "./InfoList.styled";
import { Contact } from "../../redux/Contact/ContactModule";
import { StoreState } from "../../store";
import { ContactActions } from "../../redux/Contact/ContactActions";
import { DynamicModuleLoader } from "redux-dynamic-modules";
import { ContactModule } from "../../redux/Contact/ContactModule";
import { ModalActions } from "../../redux/Modal/ModalActions";
import { getContactState } from "../../redux/Contact/ContactSelectors";

interface InfoListProps {
  contacts: Contact[];
  deleteContacts(id: string);
  openModal(meta?: object);
}

const InfoList: React.FunctionComponent<InfoListProps> = ({
  contacts,
  deleteContacts,
  openModal,
}) => {
  const openModalWithData = (data) => {
    openModal(data);
  };

  return (
    <CardList>
      {contacts.map((cardItem) => {
        return (
          <CardItem key={cardItem.id}>
            <div className="card-item__header">
              <div className="card-item__header-title">{cardItem.name}</div>
              <div className="card-item__header-actions">
                <ButtonSuccess onClick={() => openModalWithData(cardItem)}>
                  {" "}
                  Edit <img src={EditIcon} alt="" />{" "}
                </ButtonSuccess>
                <ButtonDanger onClick={() => deleteContacts(cardItem.id)}>
                  {" "}
                  Delete <img src={TrashIcon} alt="" />
                </ButtonDanger>
              </div>
            </div>
            <div className="card-item__body">
              <div className="card-item-info">Phone: {cardItem.phone}</div>
              <div className="card-item-info">Email: {cardItem.mail}</div>
              <div className="card-item-info">Address: {cardItem.address}</div>
            </div>
          </CardItem>
        );
      })}
    </CardList>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    contacts: getContactState(state),
  };
};

const ConnectedInfoList = connect(mapStateToProps, {
  ...ContactActions,
  ...ModalActions,
})(InfoList);

const DynamicInfoList = () => (
  <DynamicModuleLoader modules={[ContactModule]}>
    <ConnectedInfoList />
  </DynamicModuleLoader>
);
export default DynamicInfoList;