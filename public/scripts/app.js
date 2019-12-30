'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appRoot = document.getElementById('app');
// props are passed onto instances of components when we initialize said components
// e.g <Header />
// bind() creates a bound method with the same body as the method it is binding to
//and sets the 'this' keyword to whatever that is passed in as argument
// e.g const hello = ada.getHouse.bind({name: chidimma })
// here the getHouse method is recreated by the bind with same function body as getHouse and also
// the this keyword which should have undefined is now set to context of the inline object passed to it
// we are binding the 'this' to the class so we can use it anywhere in the component class

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.state = {
      options: props.options
    };
    console.log(props.options, 'hello class');
    console.log(_this.props.options, 'hello class this');
    _this.handleDeleteAll = _this.handleDeleteAll.bind(_this);
    _this.handleDeleteOne = _this.handleDeleteOne.bind(_this);
    _this.handlePickOption = _this.handlePickOption.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('options');
        console.log(json, 'fetching');
        var options = JSON.parse(json);
        if (options) {
          this.setState(function () {
            return {
              options: options
            };
          });
        }
      } catch (error) {
        console.log(error, 'error during mount');
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevState, prevProps) {
      if (prevState.options.length !== this.state.options.length) {
        console.log('Logging update after state change');
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('UnMounting Component');
      localStorage.clear();
    }
  }, {
    key: 'handleDeleteAll',
    value: function handleDeleteAll() {
      // this is so because we are returning a single line statement, so as not to consume
      /*
        so many lines. so to implicitly return an object we must wrap it in parenthesis first
        as shown below
      */
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'handleDeleteOne',
    value: function handleDeleteOne(optionToRemove) {
      console.log(optionToRemove);
      this.setState(function (prevState) {
        return { options: prevState.options.filter(function (option) {
            return optionToRemove !== option;
          }) };
      });
    }
  }, {
    key: 'handlePickOption',
    value: function handlePickOption() {
      var options = this.state.options;
      var randomNum = Math.floor(Math.random() * options.length);
      var selectedOption = options[randomNum];
      alert(selectedOption);
    }
  }, {
    key: 'handleAddOption',
    value: function handleAddOption(option) {
      if (!option) {
        return "Please enter a valid string";
      } else if (this.state.options.includes(option)) {
        return "Option Already Exist";
      }
      console.log('i submitted');
      this.setState(function (prevState) {
        return { options: prevState.options.concat([option]) };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var title = "Indecision Application";
      var subtitle = "Put your life in the hands of a computer";
      return React.createElement(
        'div',
        null,
        React.createElement(Header, { title: title, subtitle: subtitle }),
        React.createElement(Action, {
          hasOptions: this.state.options.length > 0,
          handlePickOption: this.handlePickOption
        }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteAll: this.handleDeleteAll,
          handleDeleteOne: this.handleDeleteOne
        }),
        React.createElement(AddOption, {
          handleAddOption: this.handleAddOption
        })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

;

IndecisionApp.defaultProps = {
  options: []
  // to create our components which is just fancy for classes in react
};var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: "Default Setting"
};

var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        onClick: props.handlePickOption,
        disabled: !props.hasOptions
      },
      'What should i do?'
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    props.options.length === 0 && React.createElement(
      'p',
      null,
      'Please Add an option to get started'
    ),
    React.createElement(
      'button',
      {
        onClick: props.handleDeleteAll
      },
      'Remove all'
    ),
    React.createElement(
      'ol',
      null,
      props.options.map(function (option, index) {
        return React.createElement(Option, {
          key: index += 1,
          optionText: option,
          handleDeleteOne: props.handleDeleteOne
        });
      })
    )
  );
};

var Option = function Option(props) {
  // below is how to pass in arguments to eventHandlers.
  /*
    the event accepts a function, whose job is to call the eventHandler
    pass in the argument so that the event handler can do its job
    Below, when the onClick event is triggered, a function is executed
    What this function does, is to accept the event and do what the event is meant to do
    in our case call props.handleDeleteOne with its argument
  */

  return React.createElement(
    'li',
    null,
    props.optionText,
    React.createElement(
      'button',
      {
        onClick: function onClick(event) {
          props.handleDeleteOne(props.optionText);
        }

      },
      'Remove Option'
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.onFormSubmit = _this2.onFormSubmit.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'onFormSubmit',
    value: function onFormSubmit(event) {
      event.preventDefault();
      console.dir(event.target, 'target');
      console.log(event.target.elements.option.value, 'value');
      var option = event.target.elements.option.value.trim();
      var error = this.props.handleAddOption(option);

      this.setState(function () {
        return { error: error };
      });
      if (!error) {
        event.target.elements.option.value = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.onFormSubmit },
          React.createElement('input', { name: 'option', type: 'text' }),
          React.createElement(
            'button',
            null,
            'Add new Option'
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

;

ReactDOM.render(React.createElement(IndecisionApp, null), appRoot);
