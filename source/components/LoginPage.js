// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Formik } from 'formik';

// Instruments
import Styles from './styles.m.css';
import { delay, schema } from '../helpers';

// Components
import { LoginForm } from './LoginForm';

@hot(module)
export class LoginPage extends Component {
    state = {
        isAuthenticated: false,
    }

    _login = async (credentials, actions) => {
        await delay(1000);

        console.log('---', JSON.stringify(credentials, null, 4));

        this.setState({
            isAuthenticated: true,
        });

        actions.setSubmitting(false);

        await delay(5000);

        this.setState({
            isAuthenticated: false,
        });
    }

    render() {
        const { isAuthenticated } = this.state;

        return (
            <section className = { Styles.loginPage }>
                {isAuthenticated
                && <div className = { Styles.loginMessage }>Добро пожаловать!</div>}
                <Formik
                    initialValues = {{
                        email:    '',
                        password: '',
                        remember: false,
                    }}
                    render = { (props) => (
                        <LoginForm
                            { ...props }
                        />
                    ) }
                    validationSchema = { schema }
                    onSubmit = { this._login }
                />
            </section>
        );
    }
}
