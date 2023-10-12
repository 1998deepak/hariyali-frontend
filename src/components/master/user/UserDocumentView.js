import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { WebDonorCreationService } from
    "../../../services/webDonorCreationService/webDonorCreation.service.js";
import { SUCCESS } from "../../constants/constants";

import Loader from "../../common/loader/Loader.js";
import Table from 'react-bootstrap/Table';
import Pagination from '../../common/Pagination';

function UserDocumentView() {


    const [loading, setLoading] = useState(false);
    const [documentList, setDocumentList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    //Calling Function
    useEffect(() => {
        getUserDocuments(0);
    }, []);

    const getUserDocuments = async (pageNo) => {
        const request = {
            pageNumber: pageNo,
            pageSize: pageSize
        }
        setLoading(true)
        const response = await WebDonorCreationService.getUserDocuments(request);
        console.log(response);
        if (response?.status === SUCCESS) {
            setTotalRecords(response.totalRecords)
            setDocumentList(response.data);
            toast.success(response?.message);
            setLoading(false)
        } else {
            toast.error(response?.message);
            setLoading(false)
        }
    };


    const handlePageClick = (event) => {
        setPageNo(event);
        getUserDocuments(event - 1);
    };

    const donwloadDocument = async (data) => {
        setLoading(true);
        const response = await WebDonorCreationService.downloadDocument(data);
        console.log(response);
        if (response?.status === 200) {
            setLoading(false);
            console.log(response);
            const url = window.URL.createObjectURL(response?.data);
            const link = document.createElement("a");
            const fileName = response.headers["content-disposition"].split("filename=")[1];
            link.href = url;
            link.setAttribute("download", fileName);
            link.click();
        } else {
            setLoading(false);
            toast.error(response?.message);
        }
    }

    return (
        <>
            <ToastContainer />
            {loading && <Loader />}
            <div className="bggray document-list">
                <div className="col-12 admin-maindiv">
                    <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
                        <div className="row">
                            <h5 className="col-9">Document List</h5>
                        </div>

                        <div class="row">
                            <div className="col-12 pr0">
                                <Table striped responsive>
                                    <thead>
                                        <tr>
                                            <th>Document Year</th>
                                            <th>Document ID</th>
                                            <th>Document Type</th>
                                            <th>File Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documentList.map(document => {
                                            return (
                                                <tr>
                                                    <td>{document.year}</td>
                                                    <td>{document.docId}</td>
                                                    <td>{document.docType}</td>
                                                    <td>{document.fileName}</td>

                                                    <td className="min-width-128">

                                                        <FiDownload title="Download File" className="icon-btn"
                                                            onClick={() => donwloadDocument(document)} />

                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>

                                {totalRecords > 0 &&
                                    <Pagination
                                        itemsCount={totalRecords}
                                        itemsPerPage={pageSize}
                                        currentPage={pageNo}
                                        setCurrentPage={handlePageClick}
                                        alwaysShown={false}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDocumentView;