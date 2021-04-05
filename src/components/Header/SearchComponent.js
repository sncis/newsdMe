import React from 'react'
import { connect } from 'react-redux';
import { handelArticleSearch } from '../../store/actions/newsAPIsearchActions'
import PropTypes from 'prop-types';


export class Search extends React.Component {
	constructor(props){
		super(props)
		this.state={
			searchTerm:''
		}
	}
	handleSearch(){
		this.props.handleSearch(this.state.searchTerm)
	}
	render(){
		return(
			<div className="search">
				<input className="search-input" placeholder="enter searchterm" onChange={(e) => this.setState({searchTerm: e.target.value})}></input>
				<button onClick={()=>this.props.handelArticleSearch(this.state.searchTerm)}>search</button>
			</div>
		)
	}
}

Search.propTypes = {
	handelArticleSearch: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
	return {
		handelArticleSearch: () => {dispatch(handelArticleSearch())},
	};
}


const SearchComponent = connect(null, mapDispatchToProps)(Search);

SearchComponent.propTypes = {
	handelArticleSearch: PropTypes.func
}

export default SearchComponent