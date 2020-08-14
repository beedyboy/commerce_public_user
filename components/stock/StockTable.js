import React, { Fragment, useEffect } from 'react'
import { Card,  CardBody, Button } from 'reactstrap'; 
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginatorFactory from 'react-bootstrap-table2-paginator';
import Switch  from 'react-bootstrap-switch';
import { useMobxStores } from '../../stores/stores';

const StockTable = ({details}) => {
    const { stockStore } = useMobxStores();
    const { stocks: data, productStock } = stockStore; 
    useEffect(() => {
        // var details = router.query.details; 
        // console.log({details})
        // const second = details[1];
        // const id = second.split("-");
        productStock(details);
    }, [])
 
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
	{dataField: "stock_name", text: "Stock Name"},
	{dataField: "quantity", text: "Quantity"},
	{dataField: "price", text: "Price",
	//filter: textFilter()
	}, 
	// {dataField: "available", text: "Qty"},
	// {dataField: "price", text: "Price"},
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
        <div>
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
        </div>
    )
}
 
// StockTable.getInitialProps = async ({ query }) => {
//     return {details: query.details}
//   }

export default StockTable
