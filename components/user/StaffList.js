import React, { Fragment } from 'react'
import {  Button } from 'reactstrap'; 
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginatorFactory from 'react-bootstrap-table2-paginator';
import Switch  from 'react-bootstrap-switch'; 

const StaffList = ({data, toggle}) => { 

 
const activeFormatter = (cell, row) => {
	return (
		 <Switch 
			defaultValue={row.status === "Active" ? true : false}
			offColor="default"
			offText="Pending"
			onColor="success"
			onText="Active" 
			onChange={(el) => toggle(el, row.status, row.id)}
			name='status' />
		  
	)
}
  const actionFormatter = (cell, row) => { 
	return (
		<>
		<Button color="warning" size="sm"><i className="fa fa-edit"></i></Button>{" "}
		<Button color="danger" size="sm"><i className="fa fa-times"></i></Button>{" "}
		</>
	)
  }
const columns = [
	{dataField: "firstname", text: "First Name"},
	{dataField: "lastname", text: "Last Name"},
	{dataField: "email", text: "Email"}, 
	{dataField: "created_at", text: "Date Created"},
	{
		dataField: "featured",
		text: "Featured", isDummy: true,
		csvExport: false,
		formatter: activeFormatter
	},
	{dataField: "actions", text: "Action",
		isDUmmyField: true, csvExport: false,
		formatter: actionFormatter
		},
];
  
    return (
        <Fragment> 
            <BootstrapTable
				keyField="id"
				data={data}
				columns={columns}
				filter={ filterFactory()}
				 //filterPosition="bottom"
				pagination={paginatorFactory({					 
					showTotal: true,
					sizePerPageList: [
					{ text: '5', value: 5},
					{ text: '10', value: 10},
					{ text: '20', value: 20},
					{ text: 'All', value: data.length}
					]
					})}
			/>
        </Fragment>
    )
}
 

export default StaffList;
