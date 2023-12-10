import React from 'react';
import './App.css';
import web3 from './web3';
import studentcoin from './studentcoin';

class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      owner: ''
    };
    this.handleSubmitGetCoins = this.handleSubmitGetCoins.bind(this);

    this.handleSubmitAwardCoins = this.handleSubmitAwardCoins.bind(this);

    this.handleSubmitExchangeCoins = this.handleSubmitExchangeCoins.bind(this);

    this.handleSubmitAddAdmin = this.handleSubmitAddAdmin.bind(this);    
  }
  async componentDidMount() {
    const owner = await studentcoin.methods.owner().call();
    this.setState({owner});
  }

  //HANDLERS

  //Get Coins Handler
  handleSubmitGetCoins = async (event) =>{
    event.preventDefault()
    const accounts = await web3.eth.getAccounts();
    const numCoins =  await studentcoin.methods.getStudentPoints(this.state.nameGetCoins).call({
      from: accounts[0]
    });
    this.setState({displayStudentCoins: this.state.nameGetCoins + " : " + numCoins})
  }

  //Award Coins Handler
  handleSubmitAwardCoins = async (event) =>{
    event.preventDefault()
    alert(`
      Student Awarded Coins!\n
      Student Name : ${this.state.awardCoinsName}
      Coins Awarded : ${this.state.awardCoinsNum}
    `)
    const accounts = await web3.eth.getAccounts();
    await studentcoin.methods.awardStudentPoints(this.state.awardCoinsName, this.state.awardCoinsNum).send({
      from: accounts[0]
    });

  }

  //Exchange Coins Handler
  handleSubmitExchangeCoins = async (event) =>{
    event.preventDefault()
    alert(`
      Exchanging coins for a prize!!
      Student Name : ${this.state.exchangeCoinsName}
      Coins Exchanged : ${this.state.exchangeCoinsNum}
    `)
    const accounts = await web3.eth.getAccounts();
    await studentcoin.methods.studentPurchase(this.state.exchangeCoinsName, this.state.exchangeCoinsNum).send({
      from: accounts[0]
    });
  }

  //Add Admin Handler
  handleSubmitAddAdmin = async (event) =>{
    event.preventDefault()
    alert(`
      Adding Admin User\n
      Address : ${this.state.adminName}
    `)
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Adding Admin User" });  
    await studentcoin.methods.addAdmin(this.state.adminName).call({
      from: accounts[0]
    });
  }

      //Get Leaderboard
  handleSubmitPrintLeaderboard = async (event) =>{
    event.preventDefault()
    const returnValue =  await studentcoin.methods.getStudentLeaderboard().call();
    const studentArray = returnValue[0]
    const coinArray = returnValue[1]

    //Sorts the leaderboard
    var zippedArray = studentArray.map(function(e, i) {
      return [e, coinArray[i]];
    });
    zippedArray.sort( (a, b) => b[1] - a[1])
    this.setState({
      displayLeaderboard: zippedArray.map( (item) => <li> {item[0]}, {item[1]} </li>)
    })
  }

  render(){
    return (
      <div class="page">
        <header class="header">
          <div class="title">
            <div>NKU Victor E. Coins</div>
            <img class="logo" height="110px" src="https://www.nku.edu/content/dam/www/images/nku-logo.png" alt="NKU Logo"/>
          </div>
        </header>
        <div class="container">

          {/* Get Student Coins */}
          <div class="child">
            <form class="format" onSubmit={this.handleSubmitGetCoins}>
              <h2>Check how many coins a student has</h2>
              <div>
                <label>Get student coins: </label>
                <input height="50"
                    id="nameGetCoins"
                    name="nameGetCoins"
                    placeholder='Enter student name'
                    onChange={(event) => this.setState({[event.target.name]: event.target.value})}
                />
              </div>
              <br></br>
              <div>
              <button name="CheckCoins">Check Coins</button>
              </div>
            </form>
            <p> {this.state.displayStudentCoins} </p>
          </div>

          {/* Award a student coins */}
          <div class="child">
            <form class="format" onSubmit={this.handleSubmitAwardCoins}>
              <h2>Award a student more coins</h2>
              <div>
                <label>Enter a student: </label>
                <input
                    id="awardCoinsName"
                    name="awardCoinsName"
                    placeholder='Enter student name'
                    onChange={(event) => this.setState({[event.target.name]: event.target.value})}
                />
                <br></br>
                <br></br>
                <label>Enter number of coins: </label>
                <input
                    id="awardCoinsNum"
                    name="awardCoinsNum"
                    placeholder='Enter a number of coins'
                    onChange={(event) => this.setState({[event.target.name]: event.target.value})}
                />
              </div>
              <br></br>
              <div>
              <button name="AwardCoins">Award Coins</button>
              </div>
            </form>
          </div>
          
          {/* Get Prize */}
          <div class="child">
            <form class="format" onSubmit={this.handleSubmitExchangeCoins}>
              <h2>Exchange Coins for A Prize</h2>
              <div>
                <label>Enter a student: </label>
                <input
                    id="exchangeCoinsName"
                    name="exchangeCoinsName"
                    placeholder='Enter student name'
                    onChange={(event) => this.setState({[event.target.name]: event.target.value})}
                />
                <br></br>
                <br></br>
                <label>Enter number of coins: </label>
                <input
                    id="exchangeCoinsNum"
                    name="exchangeCoinsNum"
                    placeholder='Enter a number of coins'
                    onChange={(event) => this.setState({[event.target.name]: event.target.value})}
                />
              </div>
              <br></br>
              <div>
              <button name="ExchangeCoins">ExchangeCoins</button>
              </div>
            </form>
          </div>
          
          {/* Add an admin user */}
          <div class="child">
            <form class="format" onSubmit={this.handleSubmitAddAdmin}>
              <h2>Add a user as an admin</h2>
              <div>
                <label>New admin: </label>
                <input
                    id="adminName"
                    name="adminName"
                    placeholder='Enter Address'
                    onChange={(event) => this.setState({[event.target.name]: event.target.value})}
                />
              </div>
              <br></br>
              <div>
              <button name="AddAdmin">Add Admin</button>
              </div>
            </form>
          </div>
        </div>

        {/* Print Leaderboard */}
        <div class="child">
          <form class="format" onSubmit={this.handleSubmitPrintLeaderboard}>
            <h2>Leaderboard</h2>
            <div>
            <button name="PrintLeaderboard">Show</button>
            </div>
          </form>
          <ol>
            {this.state.displayLeaderboard}
          </ol>
        </div>
          
      </div>
    )
  }

}
export default App;
