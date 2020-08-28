import React from 'react'
import {  Button, Progress } from 'reactstrap'; 
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginatorFactory from 'react-bootstrap-table2-paginator';
import ToolKitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// import Switch  from 'react-bootstrap-switch';
import { Fragment } from 'react';
import Link from 'next/link';

const BidList = ({user, data}) => {
const { SearchBar } = Search;
const linker = (data) => {     
    return  data.toLowerCase()
              .replace(/[^\w ]+/g, '')
              .replace(/ +/g, '-');  
  }
 
  const actionFormatter = (cell, row) => { 
	return (
		<>
         <Link href={`/bid/${user}/${linker(row.product_name)}/${row.id}-${linker(row.bid_token)}`}
           as={`/bid/${user}/${row.product_name}/${row.id}-${row.bid_token}`}>
              
              <a>View</a>
            </Link>
		<Button color="warning" size="sm"><i className="fa fa-edit"></i></Button>{" "}
		<Button color="danger" size="sm"><i className="fa fa-times"></i></Button>{" "}
		</>
	)
  }
  const statusFormatter = (cell, row) => {
    // 'Ongoing', 'Completed', 'Canceled', 'Deleted' 
        switch (row.status) {
            case "Ongoing":
                return (<Progress color="info" value="25" />)
                
                break;
            case "Completed":
                return (<Progress color="success" value="100" />)
                
                break;
    
            case "Deleted":
                return (<Progress color="danger" value="100" />)
                
                break;
    
            case "Canceled":
                return (<Progress color="warning" value="100" />)
                
                break;
    
            default:
                  return (<Progress color="info" value="25" />)
                break;
        }
  }
const columns = [
	{dataField: "stock_name", text: "Stock Name"},
    {dataField: "Seller",
     text: "shop_name",
     hidden: user === "seller" ? true : false
    }, 
	{dataField: "created_at", text: "Date Created"},
	{
		dataField: "status",
		text: "Status", isDummy: true, 
		formatter: statusFormatter
	},
	{dataField: "actions", text: "Action",
		isDUmmyField: true, csvExport: false,
		formatter: actionFormatter
		},
];
    return (
        <Fragment>
            <ToolKitProvider 
				keyField="id"
				data={data}
				columns={columns}
				filter={ filterFactory()} 
				pagination={paginatorFactory({					 
					showTotal: true,
					sizePerPageList: [
					{ text: '5', value: 5},
					{ text: '10', value: 10},
					{ text: '20', value: 20},
					{ text: 'All', value: data && data.length}
					]
                    })}
                    search
            > 
                  {
                props => (
                    <div>
                        <h3>Type to search</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          { ...props.baseProps }
		            	/>
                    </div>
                )
            }
            
            </ToolKitProvider>
             
        </Fragment>
    )
}

export default BidList
