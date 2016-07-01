"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const Modal = require("react-modal");

const LoginForm = React.createClass({

	DEMO_USERNAME: "demo",

	DEMO_PASSWORD: "asdfasdf",

	demoLoginHandler(e) {
		e.preventDefault();
		this.setState({ username: "", password: "", formType: "login"});
		var _username = this.DEMO_USERNAME.split("").slice();
		this.fillDemoUsername(_username);
	},

	fillDemoUsername: function(_username) {
	 var self = this;
	 if (_username.length > 0) {
		 setTimeout(function() {
			 self.setState({
				 username: self.state.username + _username.shift()
			 });

			 self.fillDemoUsername(_username);
		 }, 120);
	 } else {
		 var _password = this.DEMO_PASSWORD.split("").slice();
		 this.fillDemoPassword(_password);
	 }
 },

 fillDemoPassword: function(_password) {
	 var self = this;
	 if (_password.length > 0) {
		 setTimeout(function() {
			 self.setState({
				 password: self.state.password + _password.shift()
			 });

			 self.fillDemoPassword(_password);
		 }, 120);
	 } else {
		 var e = { preventDefault: function() {} };
		 this.handleDemoSubmit(e);
	 }
 },

 handleDemoSubmit(e) {
	 e.preventDefault();

	 const formData = {
		 username: this.state.username,
		 password: this.state.password
	 };

		SessionActions.logIn(formData);
 },

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return {
      username: "",
      password: ""
    };
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount() {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

	handleSubmit(e) {
		e.preventDefault();

		const formData = {
			username: this.state.username,
			password: this.state.password
		};

    if (this.props.location.pathname === "/login") {
      SessionActions.logIn(formData);
    } else {
      SessionActions.signUp(formData);
    }
	},

  fieldErrors(field) {
    const errors = ErrorStore.formErrors(this.formType());

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  formType() {
    return this.props.location.pathname.slice(1);
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },

	closeModal: function(){
    this.setState({ modalOpen: false });
		this.context.router.push("/");
  },

	render() {

    let navLink;
    if (this.formType() === "login") {
      navLink = <Link to="/signup">sign up instead</Link>;
    } else {
      navLink = <Link to="/login">log in instead</Link>;
    }

		return (
			<Modal isOpen={true}
							onRequestClose={this.closeModal}>

			<button onClick={this.closeModal}>X</button>
			<div className="login-form-container">
				<form onSubmit={this.handleSubmit} className="login-form-box">
	        Welcome!
					<br/>
					Please { this.formType() } or { navLink }

	        { this.fieldErrors("base") }
					<div className="login-form">
		        <br />
						<label> Username:
		          { this.fieldErrors("username") }
							<input type="text"
		            value={this.state.username}
		            onChange={this.update("username")}
								className="login-input" />
						</label>

		        <br />
						<label> Password:
		          { this.fieldErrors("password") }
		          <input type="password"
		            value={this.state.password}
		            onChange={this.update("password")}
								className="login-input" />
						</label>

		        <br />
						<input type="submit" value="Submit" />
					</div>
					<div id="demo-login-btn" className="modal-submit-btn"	onClick={this.demoLoginHandler}>
						Demo Login
				 </div>
				</form>
			</div>
		</Modal>
		);
	}
});

module.exports = LoginForm;
