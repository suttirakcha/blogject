import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AuthLayout from './_auth/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import RootLayout from './_root/RootLayout'
import { MainPage, PeoplePage, YourPosts, CreatePost } from './_root/pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<MainPage />}/>
          <Route path="/people" element={<PeoplePage />}/>
          <Route path="/your-posts" element={<YourPosts />}/>
          <Route path="/create-post" element={<CreatePost />}/>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App