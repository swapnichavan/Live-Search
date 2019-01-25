import React, { Component } from 'react';
import './Users.css';

const onSearch=(searchTerm)=>(user)=>(
	user.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

class Users extends Component {
    constructor(props) {
        super(props);
        this.onHandleChange=this.onHandleChange.bind(this);

        this.state={
        	result:[],
        	searchTerm:'react'
        }
    }

    onHandleSarch(searchTerm){
    	fetch(`https://hn.algolia.com/api/v1/search?query=${searchTerm}`).then
    	(res=>res.json()).then
    	(data=>this.setState({result:data.hits}));	
    }

    componentDidMount(){
    	this.onHandleSarch(this.state.searchTerm);
    }

    onHandleChange(e){
    	this.setState({searchTerm:e.target.value})
    }
    
    render() {
    	const {result}=this.state;
    	// console.log(this.state.result)
        return (
           <div className="wrapper">
           <div className="search">
           <input
           type="text"
           value={this.state.searchTerm} 
           onChange={this.onHandleChange}
           />
           </div>
           <div className="list">
           	{
           		result.filter(onSearch(this.state.searchTerm)).map((user)=>
           		<ul key={user.objectID}>
           			<li>{user.title}</li>
           		</ul>
           			)
           	}
           	</div>
           </div>
        );
    }
}

export default Users;
