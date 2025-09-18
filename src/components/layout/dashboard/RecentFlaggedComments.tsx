import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader } from "@/components/ui/loadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface FlaggedItem {
  author: string;
  severity: string;
  action: string;
  comment_html_url: string;
}

const ITEMS_PER_PAGE = 4;

export function RecentFlaggedComments({ repo }: { repo?: string }) {
  const [period, setPeriod] = useState("24h");
  const [page, setPage] = useState(0);
  const token = localStorage.getItem("access_token");

  const { data, isLoading } = useQuery<FlaggedItem[]>({
    queryKey: ["recent-flagged", period, repo],
    queryFn: async () => {
      const params: Record<string, string> = { period };
      if (repo) params.repo = repo;
      const response = await api.get("/api/dashboard/recent-flagged", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response.data;
    },
  });

  // Resetar a página quando o período mudar
  useEffect(() => {
    setPage(0);
  }, [period, repo]);

  const totalPages = useMemo(
    () => Math.ceil((data?.length ?? 0) / ITEMS_PER_PAGE),
    [data]
  );

  const pagedData = useMemo(() => {
    if (!data) return [];
    const start = page * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, page]);

  const containerClass = isLoading
    ? "filter blur-sm transition duration-300"
    : "";

  const { t } = useTranslation();

  return (
    <div className='ml-4 basis-1/3 rounded border p-4 shadow'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>
            {t("Recent Flagged Comments")}
          </h3>
          <p className='text-muted-foreground text-sm'>
            {t("The most recent flagged comments")}
          </p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className='w-32'>
            <SelectValue placeholder='Select period' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='24h'>24h</SelectItem>
            <SelectItem value='7d'>7d</SelectItem>
            <SelectItem value='30d'>30d</SelectItem>
            <SelectItem value='1y'>1y</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className={containerClass}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='space-y-3 text-sm'>
            <div className='grid grid-cols-3 gap-4 border-b pb-2 font-medium'>
              <span className='ml-2'>Author</span>
              <span className='text-center'>Severity</span>
              <span className='mr-2 text-right'>Action</span>
            </div>
            {pagedData?.map((item, idx) => (
              <div
                key={idx}
                className='grid grid-cols-3 items-center gap-4 border-b pb-3'
              >
                <span className='ml-2 truncate'>{item.author}</span>
                <div className='flex justify-center'>
                  <Badge
                    className={`text-white ${
                      item.severity === "High"
                        ? "bg-red-500"
                        : item.severity === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  >
                    {item.severity}
                  </Badge>
                </div>
                <div className='mr-2 flex justify-end'>
                  <a
                    className={cn(
                      "hidden items-center gap-1 md:flex",
                      buttonVariants({ variant: "outline", size: "sm" })
                    )}
                    title={t("Reply on GitHub")}
                    href={item.comment_html_url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <span>{item.action}</span>
                  </a>
                </div>
              </div>
            ))}
            {pagedData.length === 0 && (
              <p className='text-muted-foreground mt-4 text-center'>
                No flagged comments found.
              </p>
            )}
            <div className='mt-4 flex items-center justify-between'>
              <Button
                variant='outline'
                size='sm'
                disabled={page === 0}
                onClick={() => setPage(p => Math.max(0, p - 1))}
              >
                Previous
              </Button>
              <span className='text-muted-foreground text-sm'>
                {page + 1} / {totalPages || 1}
              </span>
              <Button
                variant='outline'
                size='sm'
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
