import { Github, Wand2 } from 'lucide-react'
import { Button } from './components/ui/button'
import { Separator } from '@radix-ui/react-separator'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { VideoInputForm } from './components/video-input-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './components/ui/select'
import { Slider } from './components/ui/slider'
import { PromptSelect } from './components/prompt-select'
import { useState } from 'react'
import { useCompletion } from 'ai/react'

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  /*   function handlePromptSelected(template: string) {
    console.log(template)
  } */
  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature
    },
    headers:{
      'Content-Type': 'application/json',
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">nlw-ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground ">
            Desenvolvido com 💙 por Gleice na nlw
          </span>
          <Separator orientation="vertical" className="h-6 border" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6 ">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="aqui tem que aparecer alguma coisa ..."
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="aqui também tem que aparecer alguma coisa..."
              value={input}
              onChange={handleInputChange}
              readOnly
              value={completion}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se você pode utilizar a variável{' '}
            <code className="text-violet-400">{'{transcription}'}</code>
            no seu prompt para adicionar o conteúdo
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <Separator className="border" />
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div className="space-y-2">
              <label>Prompt</label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-3">
              <Label>Modelo</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-ts text-muted-foreground italic ">
                Você poderá customizar essa opção em breve
              </span>
            </div>
            <Separator className="border" />
            <div className="space-y-4">
              <Label>Temperatura</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />

              <span className="block text-ts text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado nais criativo e
                com possíveis erros
              </span>
            </div>
            <Separator className="border" />
            <Button disabled={isLoading} type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
