// import {
//   Box,
//   Typography,
//   Grid,
//   CircularProgress,
//   Alert,
//   Button,
//   Skeleton,
// } from "@mui/material";
// import { useSearch } from "../hooks/useSearch";
// import SearchBar from "../components/SearchBar";
// import { ProductCard } from "../components/ProductCard";
// import type { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect } from "react";
// import BackButton from "@/shared/components/ui/BackButton";

// // ── Skeleton card while loading ────────────────────────────────────────────
// function ProductCardSkeleton() {
//   return (
//     <Box sx={{ borderRadius: 3, overflow: "hidden", bgcolor: "#FFF", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
//       <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: "1/1" }} />
//       <Box sx={{ p: 2 }}>
//         <Skeleton width="80%" height={28} sx={{ mb: 1 }} />
//         <Skeleton width="50%" height={24} sx={{ mb: 0.5 }} />
//         <Skeleton width="40%" height={20} />
//       </Box>
//     </Box>
//   );
// }

// // ── Empty state ─────────────────────────────────────────────────────────────
// function EmptyState({ query }: { query: string }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         py: 10,
//         gap: 2,
//       }}
//     >
//       <Typography fontSize={52}>🔍</Typography>
//       <Typography fontWeight={700} fontSize={20} color="#2D2D2D">
//         Sin resultados
//       </Typography>
//       <Typography color="#9E9E9E" textAlign="center" maxWidth={280}>
//         No encontramos productos para{" "}
//         <strong>"{query}"</strong>. Probá con otro término.
//       </Typography>
//     </Box>
//   );
// }

// // ── Main page ────────────────────────────────────────────────────────────────
// export default function SearchResultsPage() {
//   console.log("SearchResultsPage renderizando");
//     const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const {
//     query,
//     setQuery,
//     suggestions,
//     showSuggestions,
//     setShowSuggestions,
//     results,
//     isLoading,
//     isLoadingMore,
//     hasMore,
//     totalElements,
//     error,
//     loadMore,
//     clearSearch,
//     confirmSearch, 
//   } = useSearch();

//   // Al entrar a la página con ?q=..., disparar búsqueda
//   useEffect(() => {
//   const q = searchParams.get("q");
//   console.log("SearchResultsPage montado, q:", q);
//   if (!q) return;
//   setQuery(q);
//   confirmSearch(q);
// }, [searchParams]);

//   const handleProductClick = (product: ProductResponse) => {
//     navigate(`/products/${product.productId}`);
//   };

//   return (
//     <Box sx={{ px: { xs: 2, sm: 3 }, pt: 0.5, pb: 10, maxWidth: 1600, mx: "auto" }}>
//         {/* Botón volver para atras */}
//         <Box sx={{ pt: { xs: 0.5, sm: 1, md: 1 }, mb:3 }}>
//             <BackButton/>
//         </Box>
//       {/* Search bar */}
//       <Box sx={{ mb: 3 }}>
//         <SearchBar
//           query={query}
//           onQueryChange={setQuery}
//           onSearch={confirmSearch}
//           onClear={clearSearch}
//           suggestions={suggestions}
//           showSuggestions={showSuggestions}
//           onHideSuggestions={() => setShowSuggestions(false)}
//         />
//       </Box>

//       {/* Results header */}
//       {!isLoading && results.length > 0 && (
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 2 }}>
//           <Typography fontWeight={700} fontSize={20} color="#2D2D2D">
//             Resultados
//           </Typography>
//           <Typography fontSize={14} color="#9E9E9E">
//             {totalElements} producto{totalElements !== 1 ? "s" : ""}
//           </Typography>
//         </Box>
//       )}

//       {/* Error state */}
//       {error && (
//         <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
//           {error}
//         </Alert>
//       )}

//       {/* Loading skeletons (first page) */}
//       {isLoading && (
//         <Box
//             sx={{
//                 display: "grid",
//                 gridTemplateColumns: {
//                 xs: "1fr",
//                 sm: "repeat(2, 1fr)",
//                 md: "repeat(4, 1fr)",
//                 },
//                 gap: 2,
//             }}
//             >
//           {[...Array(6)].map((_, i) => (
//             <Grid size={6} key={i}>
//               <ProductCardSkeleton />
//             </Grid>
//           ))}
//         </Box>
//       )}

//       {/* Results grid */}
//       {!isLoading && results.length > 0 && (
//         <>
//           <Box
//             sx={{
//                 display: "grid",
//                 gridTemplateColumns: {
//                 xs: "1fr",
//                 sm: "repeat(2, 1fr)",
//                 md: "repeat(4, 1fr)",
//                 },
//                 gap: 2,
//             }}
//             >
//             {results.map((product) => (
//               <Grid size={6} key={product.productId}>
//                 <ProductCard
//                   product={product}
//                   onClick={() => handleProductClick(product)}
//                 />
//               </Grid>
//             ))}
//           </Box>

//           {/* Load more */}
//           {hasMore && (
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//               {isLoadingMore ? (
//                 <CircularProgress size={32} sx={{ color: "#77A787" }} />
//               ) : (
//                 <Button
//                   variant="outlined"
//                   onClick={loadMore}
//                   sx={{
//                     borderColor: "#77A787",
//                     color: "#77A787",
//                     borderRadius: 3,
//                     px: 4,
//                     fontWeight: 600,
//                     "&:hover": { bgcolor: "#F0F7F2", borderColor: "#5a8f6a" },
//                   }}
//                 >
//                   Cargar más
//                 </Button>
//               )}
//             </Box>
//           )}

//           {!hasMore && results.length > 0 && (
//             <Typography
//               textAlign="center"
//               color="#BDBDBD"
//               fontSize={13}
//               sx={{ mt: 4 }}
//             >
//               No hay más resultados
//             </Typography>
//           )}
//         </>
//       )}

//       {/* Empty state (search was run but no results) */}
//       {!isLoading && results.length === 0 && query && !error && (
//         <EmptyState query={query} />
//       )}
//     </Box>
//   );
// }