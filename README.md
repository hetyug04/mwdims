# Monkey With The Instant Messaging Service

##The mobile version of the App is glitchy, theres some rendering issues Im working to fix. In the meantime, please visit this app on your desktop computer to check it out. Thanks

##📖About
Monkey with the IMS, or MWDIMS is a full stack application made with ReactJS and Google Firebase. Use it to send messages, or even images, instantly to your friends using Google Accounts. Come check it out <a href="https://mwdims.netlify.app/login">here</a>

### ✨ Features

**Front End**

- **Instant Text and Image Messaging**
- **SASS Styling**
- **Styled Components**
- **Protected Routes**
- **User Search System**
- **Completely Mobile Friendly With
  Custom CSS Styling**

**Back End**

- **User Authorization Using Firebase Authentication**
- **Custom User and Conversation Schema for fast and easy usage**
- **Google Storage for image hosting**

##⚙️Development

### 💅Front end

This is my first completely self directed project, and from my background with my other ones, alot of similar technologies and libraries were used. Since I had the design in my head, I designed it as I went along.

I used ReactJS for my front end application, utilizing libraries like **Styled-Components** and a CSS framework like **SASS** to make styling and designing my project alot easier.

The application opens with a very simple login page, one that I made a conscious descision to only allow for Google Authentication (because I was using Firebase). Once the user is logged in using minimal code (again thanks to Firebase)

```
 <button className="loginButton" onClick={()=>googleSignIn()}>
 Sign in With
 <FontAwesomeIcon icon={faGoogle} />
 </button>
```

Their relevant information, like name, username, profile picture, etc. is retrieved and stored locally so that it can be used later in the application.

Later being the only other page in the application where the main dashboard is, it looks something like this

<img src="images/dashboard.png">

It might look a litte different for you because Im still in the process of making it 100% mobile friendly, a process which im like 95% done at. Also if you noticed, I used the **Font Awesome** library and used a bunch of their icons scattered throughout my project.

### 👨‍💻Backend

Like I said before, I used **Google Firebase** for my backend. To handle everything from user conversations to message and image storage. Through this project specifically,
I got pretty good at utilizing **Firebase** and its various proponents in my project. I used a pretty clever data storage structure, inspired by LamaDev to store users, the conversation information, and the messages themselves in **Firestore**. Below is an example of my storage system.
<img src="images/firestore.png">

Pertaining to the example above, this is where the magic happens. My messages collection is populated with front-end produced `messages` or conversations, eached named with a concatonated string, composed of the two users `uid`. With this, I am able to easily retrieve which conversations belong to which users, and serve their Front-End properly.

Reffering to the example of the dashboard shown earlier, an existing user (someones whos already logged into the service atleast once) can be search for in the search bar. Once they are found and selected, their conversation gets processed using the following code

```
    const {user} = useContext(AuthContext)
    const {dispatch, data} = useContext(ChatContext)
    const handleSelect = async(chat) =>{
      var concatUID = ''
      if(chat?.uid=="global"){
        concatUID = 'global'
      }
      else{
        concatUID = user.uid > chat.uid ? user.uid + chat.uid : chat.uid + user.uid;
      }
        const docRef = doc(db, 'messages', concatUID)
        const docSnap = await getDoc(docRef)

        const addRef = doc(db, 'userChats', user?.uid)
        console.log(chat)
        await updateDoc(addRef, {
          userChats: arrayUnion(chat)
        })

        const addRecieverRef = doc(db, 'userChats', chat?.uid)
        const userData = {displayName: user.displayName, photoURL: user.photoURL, uid: user.uid}
        await updateDoc(addRecieverRef, {
          userChats: arrayUnion(userData)
        })
        console.log(docSnap.exists())
        if(!docSnap.exists()){
          await setDoc(doc(db, 'messages', concatUID), {
            messages: [],
          })
        }
        else{
          dispatch({type: 'CHANGE_USER', payload: {chat, concatUID}})
          console.log(chat)
        }

      }
```

If they already exist, the current chat is changed to whatever pre-existing conversation the two uses have already. If not, a new `message` is created in the `messages` collection on **Firestore** and returned. Of course theres alot more that goes into it, like actually searching for the user, or changing the current user. But most of my data retrival processes are pretty similar, just because **Firestore**'s data retrieval is pretty straightforward in terms of how data needs to be filtered.

This `README.MD` is short explanation of how I set up my application, in both front end and backend. MWDIMS is hosted on Netlify. If you find any bugs, find my project interesting, or want to hire me, you can either email me at hetyug04@gmail.com or check out my other projects <a href="hpatel.netlify.app" target="_blank">here</a>
