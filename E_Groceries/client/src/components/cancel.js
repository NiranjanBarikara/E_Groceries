import './cancel.css'
const Cancelpage = () =>{
	const handlecancel = () =>{
		window.location.href ="/cart"
	}
	return(
		<div className="cancel">
		<h1>Sorry,</h1>
		<h1>payment canceled .</h1>
		<button className='details1' onClick={handlecancel}> Try again</button>
		</div>
	)
}
export default Cancelpage;