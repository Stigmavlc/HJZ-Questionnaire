import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { questionnaireData, type Question } from '@/data/questions'
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  RefreshCw,
  Wrench,
  ShieldCheck,
  MapPin,
  Clock,
  Timer,
  DollarSign,
  CreditCard,
  Calendar,
  AlertCircle,
  Package,
  Target,
  MessageCircle,
  Home,
  FileText,
  ClipboardCheck,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  ServerCrash
} from 'lucide-react'

const STORAGE_KEY = 'hjz-questionnaire-answers'

// Map section names to Lucide icons
const getSectionIcon = (section: string) => {
  const iconMap: Record<string, any> = {
    'Services Offered': Wrench,
    'Gas Safety & Qualifications': ShieldCheck,
    'Service Areas': MapPin,
    'Operating Hours': Clock,
    'Job Duration & Scheduling': Timer,
    'Pricing & Deposits': DollarSign,
    'Payment Methods & Deposit Collection': CreditCard,
    'Appointments & Scheduling': Calendar,
    'Emergency & Same-Day Work': AlertCircle,
    'Materials & Parts': Package,
    'Business Positioning': Target,
    'Follow-Up & Communication': MessageCircle,
    'Access & Property Requirements': Home,
    'Policies & Legal': FileText,
    'Assessments & Installations': ClipboardCheck,
    'Booking Confirmation Details': CheckCircle,
    'Common Customer Questions': HelpCircle,
    'Special Situations': AlertTriangle,
    'System Failure & Backup Plans': ServerCrash
  }

  const IconComponent = iconMap[section] || HelpCircle
  return <IconComponent className="w-6 h-6 text-blue-600" />
}

export function Questionnaire() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  const currentQuestion = questionnaireData[currentIndex]
  const progress = ((currentIndex + 1) / questionnaireData.length) * 100
  const isLastQuestion = currentIndex === questionnaireData.length - 1
  const isAllAnswered = questionnaireData.every(q => answers[q.id] !== undefined && answers[q.id] !== '')

  // Load saved answers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setAnswers(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved answers:', e)
      }
    }
  }, [])

  // Save to localStorage whenever answers change
  const saveAnswers = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  // Reset questionnaire
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the questionnaire? This will clear all your answers and cannot be undone.')) {
      setAnswers({})
      localStorage.removeItem(STORAGE_KEY)
      setCurrentIndex(0)
      setShowSuccess(false)
    }
  }

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentIndex < questionnaireData.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const generateEmailBody = () => {
    let emailBody = 'HJZ Plumbing Questionnaire - Completed Responses\\n\\n'
    emailBody += '='.repeat(60) + '\\n\\n'

    let currentSection = ''
    questionnaireData.forEach(q => {
      if (q.section !== currentSection) {
        currentSection = q.section
        emailBody += `\\n${q.sectionEmoji} ${q.section.toUpperCase()}\\n`
        emailBody += '='.repeat(60) + '\\n\\n'
      }

      emailBody += `Q: ${q.question}\\n`

      const answer = answers[q.id]
      if (answer) {
        if (Array.isArray(answer)) {
          emailBody += `A: ${answer.join(', ')}\\n`
        } else if (typeof answer === 'object') {
          emailBody += `A: ${JSON.stringify(answer, null, 2)}\\n`
        } else {
          emailBody += `A: ${answer}\\n`
        }
      } else {
        emailBody += `A: [Not answered]\\n`
      }

      emailBody += '\\n' + '-'.repeat(60) + '\\n\\n'
    })

    return emailBody
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent('HJZ Plumbing Questionnaire - Completed by Henry')
    const body = encodeURIComponent(generateEmailBody())
    const mailto = `mailto:ivanaguilarmari@gmail.com?subject=${subject}&body=${body}`

    window.location.href = mailto
  }

  const renderQuestionInput = (question: Question) => {
    const answer = answers[question.id] || ''

    switch (question.type) {
      case 'text':
        return (
          <Input
            value={answer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="mt-2"
          />
        )

      case 'textarea':
        return (
          <Textarea
            value={answer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="mt-2"
            rows={5}
          />
        )

      case 'radio':
        return (
          <div className="mt-4 space-y-3">
            {question.options?.map((option, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <RadioGroupItem
                  value={option.label}
                  checked={answer === option.label || (typeof answer === 'object' && answer.selected === option.label)}
                  onChange={() => {
                    if (option.hasTextField) {
                      handleAnswerChange(question.id, { selected: option.label, text: '' })
                    } else {
                      handleAnswerChange(question.id, option.label)
                    }
                  }}
                />
                <div className="flex-1">
                  <Label className="cursor-pointer font-normal">
                    {option.label}
                  </Label>
                  {option.hasTextField && typeof answer === 'object' && answer.selected === option.label && (
                    <Input
                      value={answer.text || ''}
                      onChange={(e) => handleAnswerChange(question.id, { ...answer, text: e.target.value })}
                      placeholder="Please specify..."
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )

      case 'checkbox-group':
        return (
          <div className="mt-4 space-y-3">
            {question.options?.map((option, idx) => {
              const checked = Array.isArray(answer) && answer.some((a: any) =>
                typeof a === 'string' ? a === option.label : a.option === option.label
              )
              const textValue = Array.isArray(answer) ? answer.find((a: any) =>
                typeof a === 'object' && a.option === option.label
              )?.text || '' : ''

              return (
                <div key={idx} className="flex items-start space-x-3">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(isChecked) => {
                      let newAnswer = Array.isArray(answer) ? [...answer] : []

                      if (isChecked) {
                        if (option.hasTextField) {
                          newAnswer.push({ option: option.label, text: '' })
                        } else {
                          newAnswer.push(option.label)
                        }
                      } else {
                        newAnswer = newAnswer.filter((a: any) =>
                          typeof a === 'string' ? a !== option.label : a.option !== option.label
                        )
                      }

                      handleAnswerChange(question.id, newAnswer)
                    }}
                  />
                  <div className="flex-1">
                    <Label className="cursor-pointer font-normal">
                      {option.label}
                    </Label>
                    {option.hasTextField && checked && (
                      <Input
                        value={textValue}
                        onChange={(e) => {
                          const newAnswer = (Array.isArray(answer) ? [...answer] : []).map((a: any) =>
                            typeof a === 'object' && a.option === option.label
                              ? { ...a, text: e.target.value }
                              : a
                          )
                          handleAnswerChange(question.id, newAnswer)
                        }}
                        placeholder="Please specify..."
                        className="mt-2"
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">HJZ Plumbing Questionnaire</h1>
          <p className="text-gray-600">
            Question {currentIndex + 1} of {questionnaireData.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-center text-gray-600">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Save Success Message */}
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            Progress saved successfully!
          </div>
        )}

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              {getSectionIcon(currentQuestion.section)}
              <CardDescription>{currentQuestion.section}</CardDescription>
            </div>
            <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
            {currentQuestion.note && (
              <p className="text-sm text-muted-foreground italic mt-2">
                {currentQuestion.note}
              </p>
            )}
            {currentQuestion.priority && (
              <div className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-2">
                CRITICAL QUESTION #{currentQuestion.priority}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {renderQuestionInput(currentQuestion)}
          </CardContent>
        </Card>

        {/* Navigation & Actions */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-stretch">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="w-full sm:w-auto sm:justify-self-start"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:justify-self-center">
            <Button
              variant="secondary"
              onClick={saveAnswers}
              className="w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Progress
            </Button>

            {isAllAnswered && (
              <Button
                variant="default"
                onClick={handleSendEmail}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send to Ivan
              </Button>
            )}
          </div>

          {!isLastQuestion ? (
            <Button
              onClick={handleNext}
              className="w-full sm:w-auto sm:justify-self-end"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setCurrentIndex(0)}
              className="w-full sm:w-auto sm:justify-self-end"
            >
              Review from Start
            </Button>
          )}

          {/* Reset Button */}
          <div className="flex justify-center sm:col-start-2 sm:col-end-3">
            <Button
              variant="destructive"
              onClick={handleReset}
              className="w-full sm:w-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Questionnaire
            </Button>
          </div>
        </div>

        {/* Completion Message */}
        {isLastQuestion && isAllAnswered && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <p className="text-center text-green-800 font-medium">
                🎉 Congratulations! You've answered all questions. Click "Send to Ivan" to submit your responses.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
