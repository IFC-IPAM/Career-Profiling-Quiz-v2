
"use client";

import { useState, type FC, type ElementType, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Zap, Briefcase, Target, Shuffle, Lightbulb, Share2, ArrowRight } from "lucide-react";

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
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-sm font-semibold text-muted-foreground">PRIMARY STRENGTHS:</span>
                <div className="flex gap-2">
                  {highTraits.map((trait) => (
                    <Badge 
                      key={trait}
                      className={cn(
                        "font-semibold text-sm py-1 px-3 rounded-full border-0 text-white hover:bg-trait-agility/90",
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
            <CardTitle className="font-headline text-center">Trait Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <ResponsiveContainer>
                <BarChart layout="vertical" data={results.chartData} margin={{ left: 10 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <ChartTooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent indicator="dot" />}
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
        </Card>
        
        {results.profile.developmentAreas && (
           <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-headline text-primary">
                Development Areas
              </h2>
            </div>
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
  const [results, setResults] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(questions.map((q) => [`q${q.id}`, ""])),
  });

  const { formState } = form;

  function onSubmit(data: FormValues) {
    setIsLoading(true);

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
      score: Math.round(((scores[trait] - 4) / 16) * 100),
    }));

    setTimeout(() => {
      setResults({ profile, chartData, scores, traitLevels });
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
  }

  const handleRetake = () => {
    setResults(null);
    setIsStarted(false);
    form.reset();
    window.scrollTo(0, 0);
  };
  
  if (isLoading) return <LoadingScreen />;
  if (results) return <QuizResults results={results} onRetake={handleRetake} />;
  
  if (!isStarted) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <div className="bg-primary text-primary-foreground text-center font-bold text-xl sm:text-2xl rounded-lg px-8 py-4 shadow-md">
            CAREER FITNESS PROFILING QUIZ
          </div>

          <div className="bg-card text-card-foreground text-center rounded-lg border border-primary/30 px-8 py-3 shadow-sm text-foreground/90">
            Discover your unique career strengths and create a personalized development plan
          </div>

          <Card className="border-primary/30">
            <CardHeader className="items-center pb-4">
              <CardTitle className="text-xl sm:text-2xl font-bold text-primary">ABOUT THIS ASSESSMENT</CardTitle>
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

          <Card className="border-primary/30">
            <CardHeader className="items-center pb-4">
              <CardTitle className="text-xl sm:text-2xl font-bold text-primary">THE FOUR DIMENSIONS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-trait-agility/10 flex shrink-0 items-center justify-center">
                  <Zap className="h-8 w-8 text-trait-agility" />
                </div>
                <div className="flex-1 p-4 rounded-lg border bg-card border-trait-agility">
                  <h3 className="font-bold text-trait-agility">AGILITY</h3>
                  <p className="text-foreground/80">How quickly you adapt to new skills and knowledge</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-trait-agency/10 flex shrink-0 items-center justify-center">
                  <Briefcase className="h-8 w-8 text-trait-agency" />
                </div>
                <div className="flex-1 p-4 rounded-lg border bg-card border-trait-agency">
                  <h3 className="font-bold text-trait-agency">AGENCY</h3>
                  <p className="text-foreground/80">How proactively you manage your career journey</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-trait-alignment/10 flex shrink-0 items-center justify-center">
                  <Target className="h-8 w-8 text-trait-alignment" />
                </div>
                <div className="flex-1 p-4 rounded-lg border bg-card border-trait-alignment">
                  <h3 className="font-bold text-trait-alignment">ALIGNMENT</h3>
                  <p className="text-foreground/80">How well you connect personal goals with organizational needs</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-trait-adaptability/10 flex shrink-0 items-center justify-center">
                  <Shuffle className="h-8 w-8 text-trait-adaptability" />
                </div>
                <div className="flex-1 p-4 rounded-lg border bg-card border-trait-adaptability">
                  <h3 className="font-bold text-trait-adaptability">ADAPTABILITY</h3>
                  <p className="text-foreground/80">How you adapt career priorities to suit different seasons of life</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center pt-2">
            <Button onClick={() => setIsStarted(true)} size="lg">
              Warm-Up
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
                <CardFooter className="flex justify-center p-0 pt-6">
                  <Button type="submit" size="lg" disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? "Calculating..." : "Submit & See My Profile"}
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
