import React, { Component } from 'react';
import FormularioCadastroAutor from './FormularioCadastroAutor';
import TabelaAutores from './TabelaAutores';
import $ from 'jquery';

class AutorBox extends Component {

    constructor() {
        super();

        this.state = {
            listaAutores: []
        };

        this.atualizaListaAutores = this.atualizaListaAutores.bind(this);
    }

    atualizaListaAutores(listaDePessoas) {
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
                this.atualizaListaAutores(resposta);
            },
            error: resposta => {
                console.log(resposta);
            }

        });
    }

    render() {
        return (
            <div className="content" id="content">
                <FormularioCadastroAutor callbackAutlizarListaAutores={this.atualizaListaAutores} />
                <TabelaAutores listaAutores={this.state.listaAutores} />
            </div>
        );
    }

}

export default AutorBox;