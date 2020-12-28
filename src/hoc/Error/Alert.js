export default class Alert extends React.PureComponent{
    shouldComponentUpdate(nextProps){
        if(nextProps.error !== this.props.error){
            return true;
        }
        return false;
    }
    render(){
        if(this.props.error){
           return (
              <h1>Some alert message {this.props.errorMsg}</h1>
           )
        }else {
           return <React.Fragment />
        }
    }
}