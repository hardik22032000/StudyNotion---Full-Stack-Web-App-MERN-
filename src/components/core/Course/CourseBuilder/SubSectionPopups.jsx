import React from 'react';
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../common/ConfirmationModal';

const SubSectionPopups = ({addSubSection,setAddSubSection,viewSubSection,setViewSubSection,editSubSection,setEditSubSection,confirmationModal}) => {
  return (
    <>
        {addSubSection ? 
        (<SubSectionModal 
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
        />) 
        :viewSubSection ? 
        (<SubSectionModal 
        modalData={viewSubSection}
        setModalData={setViewSubSection}
        view={true}
        />) 
        : editSubSection ? 
        (<SubSectionModal 
        modalData={editSubSection}
        setModalData={setEditSubSection}
        edit={true}
        />)
        : (<div></div>)
        }

        {confirmationModal ? 
        (
            <ConfirmationModal modalData={confirmationModal} />
        )
        : (<div></div>)
        }
    </>
  )
}

export default SubSectionPopups