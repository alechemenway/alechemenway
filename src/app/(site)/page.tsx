import { Introduction } from '@/components/editorial/Introduction'
import { Perspective } from '@/components/editorial/Perspective'
import { SelectedWork } from '@/components/editorial/SelectedWork'
import { SelectedThinking } from '@/components/editorial/SelectedThinking'
import { PersonalIntroduction } from '@/components/editorial/PersonalIntroduction'
import { Connect } from '@/components/editorial/Connect'
export default function Home() {
  return (
    <>
      <Introduction />
      <Perspective />
      <SelectedWork />
      <SelectedThinking />
      <PersonalIntroduction />
      <Connect />
    </>
  )
}
