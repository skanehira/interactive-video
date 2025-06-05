import { InteractiveVideo } from './components/InteractiveVideo'
import { sampleScenario } from './data/sampleScenario'
import './App.css'

function App() {
  return (
    <InteractiveVideo scenario={sampleScenario} />
  )
}

export default App
