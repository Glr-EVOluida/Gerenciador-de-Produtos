import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// variavel array de produtos
const ProductsArray = [
    // exemplo da estruturação dos dados
    {
        nome: 'Arroz',
        preco: '4',
        quantidade: '10'
      },
    ];


class Table extends React.Component{
    constructor() {
        super();

        this.state = {
         produtos:ProductsArray,
        nomeUp : '',
        precoUp: '',
        quantidadeUp: '',
        id : '',
        register : true,
        };
        // metodo BIND
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDetet = this.handleDetet.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }


  handleSubmit(e) {
    // A letra 'e' é uam abreviação para event que significa o  evento ocorrido, que nesse caso é
    // é o onSubmit  que por padão era para atualizar a pagina, porém com o uso do preventDefault
    // faz com que isso não acontença, o mesmo server  para um checkbox ou uma link <a>
    
    e.preventDefault();
    const { produtos } = this.state,
    nome = this.refs.nome.value,
    preco = this.refs.preco.value,
    quantidade = this.refs.quantidade.value,
    id = this.state.id,
    register = this.state.register;

    if( register === true){
     this.setState({
      produtos: [...produtos, {
        nome,
        preco,
        quantidade,
        register : !this.state.register,
      }]
    }, () => {
        this.setState({
            nomeUp : '',
            precoUp : '',
            quantidadeUp : '',
        })
      this.refs.nome.value = '';
      this.refs.preco.value = '';
      this.refs.quantidade.value = '';

            });
        }else{

            this.state.produtos[id].nome = this.state.nomeUp
            this.state.produtos[id].preco = this.state.precoUp
            this.state.produtos[id].quantidade = this.state.quantidadeUp
            this.forceUpdate()

           this.handleClear();

            }

  }



  handleUpdate(i){
    const p = this.state.produtos.slice(i,i+1),
    id = i,
    register = false;

    p.map((data)=>{
        this.setState({
            nomeUp : data.nome,
            precoUp : data.preco,
            quantidadeUp : data.quantidade,
            id : id,
            register : register,
        })
    });

}
// metodo para atualizar a state das variaveis
handleInputChange(e){
    const newValue = e.target.value,
    newName = e.target.name;

    this.setState({[newName] : newValue});
}

// metodo para limpar os campos
handleClear(){
    this.setState({
        nomeUp : '',
        precoUp : '',
        quantidadeUp : '',
        // variavel bollean que sempre vai enviar o contrário do seu estado atual
        register : !this.state.register,
    })
}


handleDetet(e){
    const produtos  = this.state.produtos;
    produtos.splice(e,1);
    return(
    this.setState({produtos : produtos})
   );

}




    render(){

      const  produtos = this.state.produtos;
      const prod =   produtos.map((produtos,strep) => {
          return(
                 <tr>
                    <td>{produtos.nome}</td>
                    <td>{produtos.preco}</td>
                    <td>{produtos.quantidade}</td>
                    <td>
                        <button  onClick={ () => this.handleUpdate(strep)} className="btn-warning btn-action"><i className="glyphicon glyphicon-cog"></i></button>
                        <button   onClick={ ()=> this.handleDetet(strep)} className="btn-danger btn-action"><i className="glyphicon glyphicon-trash"></i></button>
                    </td>
                </tr>
            );
      });

        return(

     <div className="main">

            <div className="col-md-6">
               <table className="table table-striped ">
                    <thead className="table-head">
                        <tr>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* Metodo map para mostrar os produtos */}
                        {produtos.length < 1 && <tr><td   colSpan="4">Nenhum produto foi cadastrado</td></tr>}
                        {prod}
                    </tbody>
                </table>
            </div>


           {/* Tabela de cadastro de produtos */}
            <div className="col-md-6">
                <div className="alert alert-info"> <strong> <center> <h4>{ this.state.register  ? "CADASTRAR PRODUTO ": "EDITAR PRODUTO" } </h4></center> </strong></div>
                <div className="register-main">
                    <form onSubmit={this.handleSubmit} >
                        <label>Nome</label>
                        <input ref="nome"  name="nomeUp" value={this.state.nomeUp} required onChange={this.handleInputChange} className="form-control" type="text"></input>

                        <label>Preço</label>

                        <input ref="preco" name="precoUp" value={this.state.precoUp} required onChange={this.handleInputChange}  className="form-control" type="text"></input>

                        <label>Quantidade</label>
                        <input ref="quantidade" name="quantidadeUp"  value={this.state.quantidadeUp} required onChange={this.handleInputChange}   className="form-control" type="number"></input>

                        <br></br>
                        { this.state.register  ? " ":
                        <button  onClick={()=> this.handleClear()} className="form-control btn-warning"  > CANCELAR </button> }
                        <button type="submit" className="form-control btn-info" >{ this.state.register  ? "CADASTRAR  ": "ATUALIZAR" } </button>
                    </form>
                </div>
        </div>



 </div>
        );
    }
}



ReactDOM.render(<Table />, document.getElementById('root'));


/*
Metodo Bind  é usado quando , é necessário ter acesso
a this.state e this.props, é para uma otimização no  codigo
ele pode ser chamado no constructor
  this.metodo = this.metodo.bind(this);
*/
