import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export default class CreateNote extends Component {

  state = {
    users: [],
    userSelected: '',
    title: '',
    content: '',
    date: new Date(),
    editing: false,
    _id: ''
  }
  
  async componentDidMount() {
    const pathArray = window.location.pathname.split('/', 3) //obtengo la ruta, la separo y obtengo el id

    console.log(pathArray[2])
    const res = await axios.get('http://localhost:4000/api/users')
    this.setState({
      users: res.data,
      userSelected: res.data[0].username
    })
    if (pathArray[2]) {
      const res = await axios.get('http://localhost:4000/api/notes/' + pathArray[2]);
      this.setState({
        editing: true,
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        _id: pathArray[2]
      })
    }
  }
  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected
    };
    if (this.state.editing) {
      await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote)
    } else {
      await axios.post('http://localhost:4000/api/notes', newNote);
    }
    window.location.href = '/'; //al guardar redirecciona a la direccion inicial
  }
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeDate = date => {
    this.setState({ date })
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3 p-3">
        <div className="card card-body">
          <h4>Create a Note</h4>
          {/**Select user */}
          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
            >
              {
                this.state.users.map(user =>
                  <option key={user._id} value={user.username}>
                    {user.username}
                  </option>)
              }
            </select>
            {/**Define titulo */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                onChange={this.onInputChange}
                value={this.state.title}
                required
              />
            </div>
            {/**define contenido */}
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Content"
                name="content"
                onChange={this.onInputChange}
                value={this.state.content}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-primary mt-2">
              Save
            </button>
          </form>
        </div>
      </div>
    )
  }
}
