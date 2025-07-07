"use client";

import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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


const LoadingScreen: FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-semibold text-foreground text-center">
      Analyzing your profile...
    </p>
  </div>
);

const QuizResults: FC<{ results: Results; onRetake: () => void }> = ({ results, onRetake }) => {
  const highTraits = (Object.keys(results.traitLevels) as Trait[]).filter(
    (trait) => results.traitLevels[trait] === 'High'
  );

  const traitColors: Record<Trait, { bg: string; text: string }> = {
    Agility: { bg: "bg-trait-agility/20", text: "text-trait-agility" },
    Agency: { bg: "bg-trait-agency/20", text: "text-trait-agency" },
    Alignment: { bg: "bg-trait-alignment/20", text: "text-trait-alignment" },
    Adaptability: { bg: "bg-trait-adaptability/20", text: "text-trait-adaptability" },
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in-0 duration-1000">
        
        <div className="text-center">
          <div className="block w-full bg-primary text-primary-foreground font-bold text-xl rounded-lg px-8 py-3 mb-4 shadow-md">
            CAREER PROFILE RESULTS
          </div>
        </div>

        <Card className="overflow-hidden shadow-lg">
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
                      variant="outline"
                      className={cn(
                        "font-semibold text-sm py-1 px-3 rounded-full border-0",
                        traitColors[trait].bg,
                        traitColors[trait].text,
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
            <CardTitle className="font-headline">Trait Analysis</CardTitle>
            <CardDescription>
              Your scores for each career fitness trait, converted to a percentage.
            </CardDescription>
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
                      <Cell key={`cell-${entry.name}`} fill={`var(--color-${entry.name})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {results.profile.developmentAreas && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Development Areas</CardTitle>
              <CardDescription>
                Tips to help you grow in each of the four career fitness traits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {(Object.keys(results.profile.developmentAreas) as Trait[]).map((trait) => (
                  <AccordionItem value={trait} key={trait}>
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      {trait}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                      <p className="text-base text-muted-foreground">
                        {results.profile.developmentAreas![trait].description}
                      </p>
                      <div>
                        <span className="font-semibold text-accent">Tip: </span>
                        <span className="text-base text-foreground">
                          {results.profile.developmentAreas![trait].tip}
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center">
            <Button onClick={onRetake} size="lg">Retake Quiz</Button>
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
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <Card className="max-w-xl w-full">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl font-bold font-headline text-primary">Discover Your Career Fitness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-6">
              This short quiz will help you understand your strengths in the modern workplace. Answer 16 questions to reveal your unique career profile.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
             <Button onClick={() => setIsStarted(true)} size="lg">Start Quiz</Button>
          </CardFooter>
        </Card>
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
                              className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-4 pt-2"
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
