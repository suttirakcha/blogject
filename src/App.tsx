import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AuthLayout from './_auth/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import RootLayout from './_root/RootLayout'
import { MainPage, PeoplePage, YourPosts, CreatePost, EditPost } from './_root/pages'
import SavedPostsPage from './_root/pages/saved-posts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<MainPage />}/>
          <Route path="/people" element={<PeoplePage />}/>
          <Route path="/your-posts" element={<YourPosts />}/>
          <Route path="/create-post" element={<CreatePost />}/>
          <Route path="/saved" element={<SavedPostsPage />}/>
          <Route path="/posts/:id" element={<EditPost />}/>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/log-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App