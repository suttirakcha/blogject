import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AuthLayout from './_auth/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import RootLayout from './_root/RootLayout'
import { MainPage, SearchPage, YourPosts, CreatePost, EditPost, SavedPostsPage, UpdateUser, ProfilePage } from './_root/pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<MainPage />}/>
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/your-posts" element={<YourPosts />}/>
          <Route path="/create-post" element={<CreatePost />}/>
          <Route path="/saved" element={<SavedPostsPage />}/>
          <Route path="/update-user" element={<UpdateUser />}/>
          <Route path="/posts/:id" element={<EditPost />}/>
          <Route path="/profile/:id" element={<ProfilePage />}/>
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