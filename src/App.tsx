import CardHome from './components/CardHome'
import postContents from './postsMock.json'


export default function App() {

  return (
    <div className="container max-lg mx-auto flex flex-wrap justify-center">
      {postContents.map((postContent) => (
        <CardHome postContent={postContent} key={postContent.id} admin={true} />
      ))}

    </div>
  )
}
