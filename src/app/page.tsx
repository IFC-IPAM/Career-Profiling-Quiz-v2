
"use client";

import { useState, type FC, type ElementType, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell, TooltipProps } from "recharts";
import { Zap, Briefcase, Target, Shuffle, Lightbulb, Share2, ArrowRight, ArrowLeft, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { questions, profiles, type Trait, type Profile } from "@/lib/quiz-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const formSchema = z.object(
  Object.fromEntries(
    questions.map((q) => [
      `q${q.id}`,
      z.string().min(1, { message: "Please select an answer." }),
    ])
  )
);

type FormValues = z.infer<typeof formSchema>;

type Results = {
  profile: Profile;
  chartData: {
    name: string;
    score: number;
  }[];
  scores: Record<Trait, number>;
  traitLevels: Record<Trait, 'High' | 'Low'>;
};

const likertScale = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" },
];

const chartConfig = {
  score: { label: "Score" },
  Agility: { label: "Agility", color: "hsl(var(--trait-agility))" },
  Agency: { label: "Agency", color: "hsl(var(--trait-agency))" },
  Alignment: { label: "Alignment", color: "hsl(var(--trait-alignment))" },
  Adaptability: { label: "Adaptability", color: "hsl(var(--trait-adaptability))" },
} satisfies ChartConfig;

const traitDefinitions: Record<Trait, string> = {
  Agility: "How quickly you adapt to new skills and knowledge",
  Agency: "How proactively you manage your career journey",
  Alignment: "How well you connect personal goals with organizational needs",
  Adaptability: "How you adapt career priorities to suit different seasons of life",
};

const traitIcons: Record<Trait, ElementType> = {
  Agility: Zap,
  Agency: Briefcase,
  Alignment: Target,
  Adaptability: Shuffle,
};


const LoadingScreen: FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-semibold text-foreground text-center">
      Analyzing your profile...
    </p>
  </div>
);

const CustomTooltipContent: FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const score = data.value as number;
      
      let interpretation = "";
      if (score < 60) {
        interpretation = "Requires work";
      } else if (score < 75) {
        interpretation = "Getting there...";
      } else {
        interpretation = "Excellent!";
      }

      return (
        <div className="p-2 bg-background border rounded-md shadow-lg text-sm">
          <p className="font-bold">{data.payload.name}</p>
          <p>Score: {score}%</p>
          <p className="text-muted-foreground italic">{interpretation}</p>
        </div>
      );
    }
  
    return null;
  };

const QuizResults: FC<{ results: Results; onRetake: () => void }> = ({ results, onRetake }) => {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.share) {
      setCanShare(true);
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Career Fitness Profiling Quiz',
      text: "I just discovered my career fitness profile! Take the quiz to find out yours.",
      url: window.location.origin,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err instanceof Error && (err.name === 'AbortError' || err.name === 'NotAllowedError')) {
      } else {
        console.error('Error sharing page: ', err);
      }
    }
  };

  const highTraits = (Object.keys(results.traitLevels) as Trait[]).filter(
    (trait) => results.traitLevels[trait] === 'High'
  );

  const traitColors: Record<Trait, { text: string; border: string; solidBg: string }> = {
    Agility: { text: "text-trait-agility", border: "border-t-trait-agility", solidBg: "bg-trait-agility" },
    Agency: { text: "text-trait-agency", border: "border-t-trait-agency", solidBg: "bg-trait-agency" },
    Alignment: { text: "text-trait-alignment", border: "border-t-trait-alignment", solidBg: "bg-trait-alignment" },
    Adaptability: { text: "text-trait-adaptability", border: "border-t-trait-adaptability", solidBg: "bg-trait-adaptability" },
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in-0 duration-1000">
        
        <div className="block w-full bg-primary text-primary-foreground font-bold text-xl rounded-t-lg px-8 py-3 shadow-md text-center">
            CAREER PROFILE RESULTS
        </div>

        <Card className="overflow-hidden shadow-lg -mt-8 rounded-t-none w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4 uppercase">
              {results.profile.title}
            </h2>
            {highTraits.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
                <span className="shrink-0 text-sm font-semibold text-muted-foreground">PRIMARY STRENGTHS:</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {highTraits.map((trait) => (
                    <Badge 
                      key={trait}
                      className={cn(
                        "font-semibold text-sm py-1 px-3 rounded-full border-0 text-white",
                        traitColors[trait].solidBg
                      )}
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              {results.profile.description}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-center">Your 4A's</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <ResponsiveContainer>
                <BarChart layout="vertical" data={results.chartData} margin={{ left: 10 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <ChartTooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<CustomTooltipContent />}
                  />
                  <Bar dataKey="score" radius={4}>
                    {results.chartData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={chartConfig[entry.name as keyof typeof chartConfig].color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 items-center justify-center pt-2">
            <p className="text-sm text-muted-foreground">Click on the bars to understand your results!</p>
          </CardFooter>
        </Card>
        
        {results.profile.developmentAreas && (
           <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {(Object.keys(results.profile.developmentAreas) as Trait[]).map((trait) => {
                const Icon = traitIcons[trait];
                return (
                  <Card key={trait} className={cn("overflow-hidden border-t-4", traitColors[trait].border)}>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center gap-3">
                        <Icon className={cn("h-7 w-7", traitColors[trait].text)} />
                        <h3 className={cn("text-xl font-bold uppercase", traitColors[trait].text)}>
                          {trait}
                        </h3>
                      </div>
                      <p className="text-base text-muted-foreground">{traitDefinitions[trait]}</p>
                      <p className="text-base text-foreground">
                        {results.profile.developmentAreas![trait].description}
                      </p>
                      <div className="mt-2 flex items-start gap-4 rounded-lg bg-muted/50 p-4 shadow-sm">
                        <Lightbulb className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                        <p className="text-sm text-foreground">
                          {results.profile.developmentAreas![trait].tip}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4">
            <Button onClick={onRetake} size="lg">Retake Quiz</Button>
            {canShare && (
              <Button onClick={handleShare} size="lg" variant="outline">
                <Share2 />
                Share
              </Button>
            )}
        </div>
      </div>
    </main>
  );
};

export default function CareerFitnessQuiz() {
  const [quizState, setQuizState] = useState<'welcome' | 'instructions' | 'active' | 'loading' | 'results'>('welcome');
  const [results, setResults] = useState<Results | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(questions.map((q) => [`q${q.id}`, ""])),
  });

  const { formState } = form;

  function onSubmit(data: FormValues) {
    setQuizState('loading');

    const scores: Record<Trait, number> = { Agility: 0, Agency: 0, Alignment: 0, Adaptability: 0 };
    for (const question of questions) {
      const answerValue = parseInt(data[`q${question.id}` as keyof FormValues], 10);
      scores[question.trait] += answerValue;
    }

    const traitLevels = {
      Agility: scores.Agility >= 13 ? 'High' : 'Low',
      Agency: scores.Agency >= 13 ? 'High' : 'Low',
      Alignment: scores.Alignment >= 13 ? 'High' : 'Low',
      Adaptability: scores.Adaptability >= 13 ? 'High' : 'Low',
    };

    const profileKey = `${traitLevels.Agility}-${traitLevels.Agency}-${traitLevels.Alignment}-${traitLevels.Adaptability}`;
    const profile = profiles[profileKey as keyof typeof profiles] || profiles["default"];

    const chartData = (Object.keys(scores) as Trait[]).map((trait) => ({
      name: trait,
      score: Math.round((scores[trait] / 20) * 100),
    }));

    setTimeout(() => {
      setResults({ profile, chartData, scores, traitLevels });
      setQuizState('results');
      window.scrollTo(0, 0);
    }, 1500);
  }

  const handleRetake = () => {
    setResults(null);
    setQuizState('welcome');
    form.reset();
    window.scrollTo(0, 0);
  };
  
  if (quizState === 'loading') return <LoadingScreen />;
  if (quizState === 'results' && results) return <QuizResults results={results} onRetake={handleRetake} />;
  
  if (quizState === 'welcome') {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <div className="bg-primary text-primary-foreground text-center font-bold text-2xl sm:text-3xl rounded-lg px-8 py-6 shadow-lg">
            CAREER FITNESS PROFILING QUIZ
          </div>

          <Card className="border-2 border-primary">
            <CardHeader className="items-center pb-4">
              <CardTitle>ABOUT THIS ASSESSMENT</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ul className="list-disc list-inside space-y-2 text-foreground/80 text-base">
                <li>16 simple questions across 4 key career dimensions</li>
                <li>Takes approximately 5-7 minutes to complete</li>
                <li>Receive personalized insights based on your unique profile</li>
                <li>Get tailored development strategies to enhance your career fitness</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary">
            <CardHeader className="items-center pb-4">
              <CardTitle>THE FOUR A'S</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-trait-agility/10 flex shrink-0 items-center justify-center">
                  <Zap className="h-8 w-8 text-trait-agility" />
                </div>
                <div className="flex-1 p-4 rounded-lg border bg-card border-trait-agility">
                  <h3 className="font-bold text-trait-agility">AGILITY</h3>
                  <p className="text-foreground/80 text-base">How quickly you adapt to new skills and knowledge</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-trait-agency/10 flex shrink-0 items-center justify-center">
                  <Briefcase className="h-8 w-8 text-trait-agency" />
                </div>
                <div className="flex-1 p-4 rounded-lg border bg-card border-trait-agency">
                  <h3 className="font-bold text-trait-agency">AGENCY</h3>
                  <p className="text-foreground/80 text-base">How proactively you manage your career journey</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-trait-alignment/10 flex shrink-0 items-center justify-center">
                  <Target className="h-8 w-8 text-trait-alignment" />
                </div>
                <div className="flex-1 p-4 rounded-lg border bg-card border-trait-alignment">
                  <h3 className="font-bold text-trait-alignment">ALIGNMENT</h3>
                  <p className="text-foreground/80 text-base">How well you connect personal goals with organizational needs</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-trait-adaptability/10 flex shrink-0 items-center justify-center">
                  <Shuffle className="h-8 w-8 text-trait-adaptability" />
                </div>
                <div className="flex-1 p-4 rounded-lg border bg-card border-trait-adaptability">
                  <h3 className="font-bold text-trait-adaptability">ADAPTABILITY</h3>
                  <p className="text-foreground/80 text-base">How you adapt career priorities to suit different seasons of life</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end pt-2">
            <Button onClick={() => setQuizState('instructions')} size="lg">
              Warm-Up
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (quizState === 'instructions') {
    const scoreboardItems = [
      { number: 1, title: "STRONGLY DISAGREE", description: "This does not describe me at all" },
      { number: 2, title: "DISAGREE", description: "This describes me somewhat" },
      { number: 3, title: "NEUTRAL", description: "This describes me about half the time" },
      { number: 4, title: "AGREE", description: "This describes me most of the time" },
      { number: 5, title: "STRONGLY AGREE", description: "This describes me completely" },
    ];

    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <Card className="border-2 border-primary">
            <CardContent className="p-6 flex items-start gap-4">
              <Info className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-primary">HOW TO COMPLETE THE QUIZ</h2>
                <p className="text-foreground/80 mt-1">
                  For each statement, indicate how much you agree or disagree based on your current career practices.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-primary text-primary-foreground font-bold text-lg rounded-full px-6 py-2 shadow-md">
                SCOREBOARD
              </div>
            </div>
            <Card className="border-2 border-primary pt-10">
              <CardContent className="p-6 space-y-4">
                {scoreboardItems.map((item) => (
                  <div key={item.number} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-b from-primary-gradient-start to-primary-gradient-end rounded-md flex items-center justify-center text-primary-foreground font-bold text-2xl">
                      {item.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">{item.title}</h3>
                      <p className="text-foreground/80">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between pt-2">
            <Button onClick={() => setQuizState('welcome')} variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Step back
            </Button>
            <Button onClick={() => setQuizState('active')} size="lg">
              Game On!
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl font-bold text-center font-headline text-primary">Career Fitness Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-10">
                  {questions.map((question, index) => (
                    <FormField
                      key={question.id}
                      control={form.control}
                      name={`q${question.id}` as keyof FormValues}
                      render={({ field }) => (
                        <FormItem className="space-y-3 p-4 rounded-lg border bg-card">
                          <FormLabel className="text-lg font-semibold">
                            {index + 1}. {question.text}
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-2"
                            >
                              {likertScale.map((item) => (
                                <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={item.value} />
                                  </FormControl>
                                  <FormLabel className="font-normal">{item.label}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <CardFooter className="flex justify-between p-0 pt-6">
                  <Button type="button" variant="outline" size="lg" onClick={() => setQuizState('instructions')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button type="submit" size="lg" disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? "Calculating..." : "Submit"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
