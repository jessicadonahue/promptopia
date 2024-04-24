import { Suspense } from 'react'
import EditPrompt from "@components/EditPrompt";

function EditPromptFallback() {
    return <>placeholder</>
  }
   
const EditPromptPage = () => {
    return (
        <Suspense fallback={<EditPromptFallback />}>
            <EditPrompt />
        </Suspense>
    )
}

export default EditPromptPage