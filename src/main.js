import { mount } from 'svelte'
import './index.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
  props: {
      url:"/dataset.json"
  }
})

export default app
