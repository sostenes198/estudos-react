import React, { Component } from 'react';
import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';

class App extends Component {

    constructor() {
        super();
        this.state = {
            listaAutores: [],
            nome: '',
            email: '',
            senha: ''
        };

        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this._construirPessoas = this._construirPessoas.bind(this);
    }

    _construirPessoas(listaDePessoas) {
        let _pessoasTemp = [];
        for (let index = listaDePessoas.length - 1; index > (listaDePessoas.length - 11); index--) {
            _pessoasTemp.push(listaDePessoas[index]);
        }
        this.setState({ listaAutores: _pessoasTemp });
    }

    componentDidMount() {
        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/autores",
            method: 'GET',
            dataType: "json",
            success: resposta => {
                this._construirPessoas(resposta);
            },
            error: resposta => {
                console.log(resposta);
            }

        });
    }

    enviaForm(evento) {
        evento.preventDefault();

        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/autores",
            contentType: 'application/json',
            dataType: "json",
            type: 'POST',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: (resposta) => {
                this._construirPessoas(resposta);
            },
            error: (resposta) => {
                console.log(resposta);
            }
        })
    }

    setNome(evento) {
        this.setState({ nome: evento.target.value });
    }

    setEmail(evento) {
        this.setState({ email: evento.target.value });
    }

    setSenha(evento) {
        this.setState({ senha: evento.target.value });
    }

    render() {
        return (
            <div id="layout">
                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a className="pure-menu-link">Autor</a></li>
                            <li className="pure-menu-item"><a className="pure-menu-link">Livro</a></li>
                        </ul>
                    </div>
                </div>
                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                        <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="nome" />
                                <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="email" />
                                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="senha" />                                
                                <div className="pure-control-group">
                                    <label></label>
                                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                                </div>
                            </form>

                        </div>
                        <div>
                            <table className="pure-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.listaAutores.map((autor) => {
                                            return (
                                                <tr key={autor.id}>
                                                    <td>{autor.nome}</td>
                                                    <td>{autor.email}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;

